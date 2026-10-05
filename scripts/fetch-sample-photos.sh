#!/usr/bin/env bash
# Tải ảnh minh hoạ mẫu từ Unsplash về public/images/site/<tên>.jpg rồi trỏ src/lib/media.ts sang file .jpg.
# Chạy trên GitHub Actions (máy có internet). Chỉ nhận ảnh miễn phí từ images.unsplash.com (bỏ qua Unsplash+).
set -uo pipefail
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
OUT=public/images/site
CREDITS=$OUT/CREDITS.txt
ok=0; fail=0
echo "Ảnh minh hoạ từ Unsplash (Unsplash License) — thay bằng ảnh thật của Việt Úc." > "$CREDITS"

while read -r name id; do
  [[ -z "${name:-}" || "$name" == \#* ]] && continue
  if [[ "$name" == hero-* || "$name" == page-* || "$name" == story-wide || "$name" == cta || "$name" == program-* || "$name" == post-* || "$name" == about-2 ]]; then w=1920; else w=1200; fi
  html=$(curl -sL --max-time 30 -A "$UA" "https://unsplash.com/photos/$id" || true)
  og=$(printf '%s' "$html" | grep -oE '<meta[^>]+property="og:image"[^>]+>' | head -1 | grep -oE 'content="[^"]+"' | sed -E 's/content="//; s/"$//; s/&amp;/\&/g')
  if [[ "$og" == https://images.unsplash.com/photo-* ]]; then
    url="${og%%\?*}?w=$w&q=78&fm=jpg&fit=max"
  else
    url="https://unsplash.com/photos/$id/download?force=true&w=$w"
  fi
  tmp=$(mktemp)
  curl -sL --max-time 60 -A "$UA" -o "$tmp" "$url" || true
  mime=$(file -b --mime-type "$tmp"); size=$(stat -c %s "$tmp")
  final=$(curl -sIL --max-time 30 -A "$UA" -o /dev/null -w '%{url_effective}' "$url" || true)
  if [[ "$mime" == image/jpeg && "$size" -gt 20000 && "$final" != *plus.unsplash.com* && "$final" != *premium_photo* ]]; then
    # Ảnh quá lớn (tải bản gốc) thì thu nhỏ
    if [[ "$size" -gt 900000 ]] && command -v convert >/dev/null; then convert "$tmp" -resize "${w}x${w}>" -quality 78 -strip "$tmp.jpg" && mv "$tmp.jpg" "$tmp"; fi
    mv "$tmp" "$OUT/$name.jpg"
    perl -pi -e 's/m\("\Q'"$name"'\E\.svg", ("[^"]*"), "[^"]*"\)/m("'"$name"'.jpg", $1)/' src/lib/media.ts
    echo "$name.jpg  https://unsplash.com/photos/$id" >> "$CREDITS"
    echo "OK   $name ($id) $(( $(stat -c %s "$OUT/$name.jpg") / 1024 ))KB"; ok=$((ok+1))
  else
    rm -f "$tmp"; echo "FAIL $name ($id) mime=$mime size=$size og=${og:0:60}"; fail=$((fail+1))
  fi
done < scripts/sample-photos.txt
echo "Xong: $ok ảnh OK, $fail lỗi"
