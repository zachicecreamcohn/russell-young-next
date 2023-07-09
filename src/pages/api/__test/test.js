import EmailSender from "../_common/Mail/Mail";



export default async function handler(req, res) {
    const sender = new EmailSender();
    const link = process.env.NEXT_ROOT_URL + "/create-account?token=1234567890"
    const htmlData = {
        header: "Create your account",
        body: "An account has been created for you. Please click the link below to complete the setup process.",
        button : {
            content: "CREATE ACCOUNT",
            link:link
        },
        }

        const text = `An account has been created for you. Please click go to ${link} to complete the setup process.`
    
    const html = sender.getHTML("basicLink", htmlData);



    const success = await sender.sendEmail("zwc1223@gmail.com", "Finish Creating Your Account", text, html);
    if (!success) {
        res.status(500).json({ success: false, error: success });
        return;
    }

    res.status(200).json({ success: true });
}