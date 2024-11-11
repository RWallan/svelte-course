import { SENDGRID_API_KEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";
import { json } from "@sveltejs/kit";

sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST({ request }) {
  const { contactEmail, contactName, informationAboutProject } =
    await request.json();

  if (!contactEmail || !contactName || !informationAboutProject) {
    return json(
      { message: "Could not send e-mail. Missing data" },
      { status: 400 }
    );
  }

  const message = {
    to: "coding.rwallan@gmail.com",
    from: "coding.rwallan@gmail.com",
    subject: "Contact Form on your portfolio",
    html: `Somebody used the contact form on your site. <br />
    Name: ${contactName} <br />
    Email: ${contactEmail} <br />
    Information: ${informationAboutProject}`,
  };

  try {
    await sgMail.send(message);
    return json({ success: true });
  } catch (err) {
    console.log(err);
    return json({ err }, { status: 500 });
  }
}
