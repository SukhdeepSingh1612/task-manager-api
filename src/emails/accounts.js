const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'sukhdeep.singh@kiwitech.com',
        pass: 'Kiwi@2018'
    }

});
const sendWelcomeEmail= (email,name) =>{
        const mailoption = {
            from: 'sukhdeep.singh@kiwitech.com',
            to: email,
            subject: 'Welcome to Task App',
            //text: `Thank you for joining the app, ${name}. Let me how you get along with the app`,
            html: `<h1> Task App </h1> Thank you for joining the app, ${name}. Let me how you get along with the app`
        }



    transport.sendMail(mailoption, function(error,info){
        if(error){
            console.log(error);
        } else{
            console.log('email sent', info.response)
        }
    })
}

const sendCancellationEmail= (email,name) =>{
    const mailoption = {
        from: 'sukhdeep.singh@kiwitech.com',
        to: email,
        subject: 'Sorry to see you leave Task App',
        html: `<h2> Task App </h2>
         <p> It was fun having you, ${name}. Let me know, how we could have been better!</p>`
    }



transport.sendMail(mailoption, function(error,info){
    if(error){
        console.log(error);
    } else{
        console.log('email sent', info.response)
    }
})
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}


