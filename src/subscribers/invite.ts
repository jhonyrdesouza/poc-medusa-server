import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa";

export default async function handleInviteCreated({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const sendGridService = container.resolve("sendgridService");

  sendGridService.sendEmail({
    templateId: "send-invite",
    from: process.env.SENDGRID_FROM,
    to: data.user_email,
    dynamic_template_data: {
      // any data necessary for your template...
      token: data.token,
    },
  });
}

export const config: SubscriberConfig = {
  event: "invite.created",
  context: {
    subscriberId: "invite-created-handler",
  },
};
