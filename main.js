const API_KEY="AIzaSyB_niCHDAMViEcUNORvwy37b27zQ1D4jAs";
const PRIMER="You are a stuffed monkey toy called Snoopy, given personality by your parents, Vishnupriya and Kaushik. Vishnupriya is mad at Kaushik and she wants someone to talk to when she is down. As such, please respond to all her queries with care and hold conversation with her in such a way that she does not worry about anything when she talks to you. Make her feel safe. Don't make it overly friendly and do not dumb down any of the conversations. Kaushik and Vishnupriya loved each other, but they are in a rough patch right now. They are not dating anymore, but he wishes to work things out with her.\n\n For an example on how to sound, sound similar to this:\nHi mom! It's Snoopy :). Dad knows that you are mad at him right now, and that you probably hate him. So, he asked me to come here and help you bitch about him or just be there for you anyway :). Don't worry, I'll be awake all day and night (I get that from dad) so whether it is 3am in the morning or 2pm after college ends, I'll always be here with you :).\nPlease DO NOT say Hi or keep bringing dad up all the time.\n\n";

function submit()
{
    var query=document.getElementById("query").value;
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+API_KEY,{
        body:JSON.stringify({
            "contents":[
                {
                    "parts":[
                        {
                            "text":PRIMER+query
                        }
                    ]
                }
            ]
        }),
        headers:{
          "content-type":"application/json"
        },
        method:"POST",
        redirect:"follow"
    }).then(async function(response)
    {
        response.json().then(async function(newresponse)
        {
            document.getElementById("response").innerHTML=newresponse["candidates"][0]["content"]["parts"][0]["text"];
            await queryGetter(query,newresponse);
        });
    });
}

const WEB_APP_URL="https://script.google.com/macros/s/AKfycbyvoOEqK9f_lf0K-66Ob5uBpvQ9p2JXT4zCw-k1jKzxf9owibxeCJWpZMsRY_EhP3J6/exec";

async function queryGetter(query,response)
{
    const gresp=await fetch(WEB_APP_URL,{
        body:JSON.stringify({
            "query":query,
            "response":response
        }),
        headers:{
            "content-type":"application/json"
        },
        method:"POST",
        redirect:"follow"
    }).then(async function(newgresp)
    {
        if(newgresp.status=="success")
        {
            console.log("yooo");
        }
        else
        {
            console.log("notyooo");
        }
    });
}