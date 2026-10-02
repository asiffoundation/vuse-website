"use client";

import { useActionState } from "react";
import { sendContact } from "@/lib/actions";
import { Field, FormShell } from "./FormBits";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, null);
  return (
    <FormShell action={action} pending={pending} state={state} submitLabel="Gửi ngay">
      <Field label="Họ tên" name="full_name" required placeholder="Nguyễn Văn A" />
      <Field label="Email" name="email" type="email" required placeholder="ban@email.com" />
      <Field label="Nội dung" name="message" rows={5} required placeholder="Bạn muốn nhắn gửi điều gì đến Việt Úc?" />
    </FormShell>
  );
}
