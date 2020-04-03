const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const git = require('simple-git');
const QuickEncrypt = require('quick-encrypt')

client.on('ready', () => {
    EncryptCONFIG();
    console.log('all component initialized');
    client.user.setStatus('online')
    client.user.setActivity(`${prefix}help || https://lilbots.github.io/Lil-Bots-Officials/index.htm`, { type: "WATCHING" })
    refreshHtml();
    client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
            db.set(`${msg.content}.likes`, downVoteCollection.first().count);
            let mm = db.get(`${msg.content}.likes`);
            console.log(`${msg.content} with ${mm}`);
            list.push(`${msg.content} with ${mm}\n`);
        })
        fs.writeFile('./likes.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);
            list.push(`${u} (${l}👍) : ${c}\n`);
            console.log(`${u} (${l}👍) : ${c}`);
        })
        fs.writeFile('./comments.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
    require('simple-git')()
        //.init()
        .add('.')
        .commit("first commit!")
        //.addRemote('origin', 'https://github.com/Lilbots/Lil-Bots-Officials.git')
        .push(['--force', 'origin', 'master'], () => console.log('done'));
})

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);
            list.push(`${u} (${l}👍) : ${c}\n`);
            console.log(`${u} (${l}👍) : ${c}`);
        })
        fs.writeFile('./comments.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    if (message.channel.id === '694603884580306974') {
        message.react('👍');
    }

    if (message.channel.id === '694602009394806894') {
        message.react('💛');
    }

    if (cmd === 'likes') {
        client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
            list = [];
            console.log(`${messages.size} messages`);

            finalArray = [];

            const putInArray = async(data) => finalArray.push(data);
            //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

            for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

            // console.log(finalArray);
            // console.log(finalArray.length);


            messages.array().forEach(msg => {
                let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
                db.set(`${msg.content}.likes`, downVoteCollection.first().count);
                let mm = db.get(`${msg.content}.likes`);
                list.push(`${msg.content} with ${mm}`);
                message.channel.send(`${msg.content} with ${mm} 💛`);
            })
            fs.writeFile('./likes.txt', `${list}`, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        });
    }

    if (cmd === 'comments') {
        client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
            list = [];
            console.log(`${messages.size} messages`);

            finalArray = [];

            const putInArray = async(data) => finalArray.push(data);
            //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

            for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

            // console.log(finalArray);
            // console.log(finalArray.length);


            messages.array().forEach(msg => {
                let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

                db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
                db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
                db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

                let l = db.get(`${msg.author.id}.${msg.content}.likes`);
                let c = db.get(`${msg.author.id}.${msg.content}.content`);
                let u = db.get(`${msg.author.id}.${msg.content}.user`);
                list.push(`@${u} (${l}👍) : ${c}\n`);
                message.channel.send(`<@${msg.author.id}> (${l}👍) : ${c}`);
            })
            fs.writeFile('./comments.txt', `${list}`, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        });
    }
    refreshHtml();
    if (message.channel.id === '694602009394806894' || message.channel.id === '694603884580306974') {
        require('simple-git')()
            //.init()
            .add('.')
            .commit("first commit!")
            //.addRemote('origin', 'https://github.com/Lilbots/Lil-Bots-Officials.git')
            .push(['--force', 'origin', 'master'], () => console.log('done'));
    }
})

client.on('messageReactionAdd', message => {
    client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
            db.set(`${msg.content}.likes`, downVoteCollection.first().count);
            let mm = db.get(`${msg.content}.likes`);
            console.log(`${msg.content} with ${mm}`);
            list.push(`${msg.content} with ${mm}\n`);
        })
        fs.writeFile('./likes.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);
            list.push(`${u} (${l}👍) : ${c}\n`);
            console.log(`${u} (${l}👍) : ${c}`);
        })
        fs.writeFile('./comments.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
    refreshHtml();
    if (message.message.channel.id === '694602009394806894' || message.message.channel.id === '694603884580306974') {
        require('simple-git')()
            //.init()
            .add('.')
            .commit("first commit!")
            //.addRemote('origin', 'https://github.com/Lilbots/Lil-Bots-Officials.git') 
            .push(['--force', 'origin', 'master'], () => console.log('done'));
    }
})

client.on('messageReactionRemove', message => {
    client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
            db.set(`${msg.content}.likes`, downVoteCollection.first().count);
            let mm = db.get(`${msg.content}.likes`);
            console.log(`${msg.content} with ${mm}`);
            list.push(`${msg.content} with ${mm}\n`);
        })
        fs.writeFile('./likes.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);
            list.push(`${u} (${l}👍) : ${c}\n`);
            console.log(`${u} (${l}👍) : ${c}`);
        })
        fs.writeFile('./comments.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
    refreshHtml();
    if (message.message.channel.id === '694602009394806894' || message.message.channel.id === '694603884580306974') {
        require('simple-git')()
            //.init()
            .add('.')
            .commit("first commit!")
            //.addRemote('origin', 'https://github.com/Lilbots/Lil-Bots-Officials.git')
            .push(['--force', 'origin', 'master'], () => console.log('done'));
    }
})

client.on('messageUpdate', message => {
    client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
            db.set(`${msg.content}.likes`, downVoteCollection.first().count);
            let mm = db.get(`${msg.content}.likes`);
            console.log(`${msg.content} with ${mm}`);
            list.push(`${msg.content} with ${mm}\n`);
        })
        fs.writeFile('./likes.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);
            list.push(`${u} (${l}👍) : ${c}\n`);
            console.log(`${u} (${l}👍) : ${c}`);
        })
        fs.writeFile('./comments.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
    refreshHtml();
    if (message.channel.id === '694602009394806894' || message.channel.id === '694603884580306974') {
        require('simple-git')()
            //.init()
            .add('.')
            .commit("first commit!")
            //.addRemote('origin', 'https://github.com/Lilbots/Lil-Bots-Officials.git')
            .push(['--force', 'origin', 'master'], () => console.log('done'));
    }
})

client.on('messageDelete', message => {
    client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
            db.set(`${msg.content}.likes`, downVoteCollection.first().count);
            let mm = db.get(`${msg.content}.likes`);
            console.log(`${msg.content} with ${mm}`);
            list.push(`${msg.content} with ${mm}\n`);
        })
        fs.writeFile('./likes.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        list = [];
        console.log(`${messages.size} messages`);

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);
            list.push(`${u} (${l}👍) : ${c}\n`);
            console.log(`${u} (${l}👍) : ${c}`);
        })
        fs.writeFile('./comments.txt', `${list}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
    refreshHtml();
    if (message.channel.id === '694602009394806894' || message.channel.id === '694603884580306974') {
        require('simple-git')()
            //.init()
            .add('.')
            .commit("first commit!")
            //.addRemote('origin', 'https://github.com/Lilbots/Lil-Bots-Officials.git')
            .push(['--force', 'origin', 'master'], () => console.log('done'));
    }
})

function refreshHtml() {
    client.channels.cache.get('694603884580306974').messages.fetch().then(async messages => {
        console.log(`${messages.size} messages`);
        let tds = "";

        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.author.tag} (0👍): ${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '👍');

            db.set(`${msg.author.id}.${msg.content}.likes`, downVoteCollection.first().count);
            db.set(`${msg.author.id}.${msg.content}.content`, msg.content);
            db.set(`${msg.author.id}.${msg.content}.user`, msg.author.tag);

            let l = db.get(`${msg.author.id}.${msg.content}.likes`);
            let c = db.get(`${msg.author.id}.${msg.content}.content`);
            let u = db.get(`${msg.author.id}.${msg.content}.user`);

            let t =
                `<td>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${u} (${l}👍)</h5>
                            <p class="card-text">${c}</p>
                        </div>
                    </div>
                </td>\n`
            tds += t;
        })
        html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/now-ui-kit.css">
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800&display=swap" rel="stylesheet">
        <title>Lil Bots Official</title>
    </head>
    
    <body>
        <nav class="navbar navbar-expand-lg bg-transparent">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="index.htm">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://discord.gg/H3rZSvn">Join our server</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="team.htm">Team</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Reviews
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="comments.htm">Comments</a>
                    <a class="dropdown-item" href="likes.htm">Likes</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Bots
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="b1.htm">Lil Moderator</a>
                    <a class="dropdown-item" href="b2.htm">Lil Log</a>
                    <a class="dropdown-item" href="b3.htm">Lil DJ</a>
                </div>
            </li>
        </ul>
    </div>
        </nav>
        <div class="start">
        <tr>
        ${tds}
        </tr>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="js/now-ui-kit.min.js"></script>
    </body>
    
    </html>`
        fs.writeFile('./comments.htm', `${html}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    client.channels.cache.get('694602009394806894').messages.fetch().then(async messages => {
        console.log(`${messages.size} messages`);
        let tds = "";
        finalArray = [];

        const putInArray = async(data) => finalArray.push(data);
        //const handleTime = (timestamp) => (timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM");

        for (const message of messages.array().reverse()) await putInArray(`${message.content}`);

        // console.log(finalArray);
        // console.log(finalArray.length);


        messages.array().forEach(msg => {
            let downVoteCollection = msg.reactions.cache.filter(rx => rx.emoji.name == '💛');
            db.set(`${msg.content}.likes`, downVoteCollection.first().count);
            let mm = db.get(`${msg.content}.likes`);
            let cc = msg.content;
            let id = cc.replace(/\D/g, '')
            let user = client.users.cache.get(id);
            console.log(`${user.tag} with ${mm}`);
            let userclient = user.client;
            let userclientguilds = userclient.guilds;
            let t =
                `<td>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${user.tag}</h5>
                            <p class="card-text">${mm}💛</p>
                        </div>
                    </div>
                </td>\n`
            tds += t;
        })
        html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/now-ui-kit.css">
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800&display=swap" rel="stylesheet">
        <title>Lil Bots Official</title>
    </head>
    
    <body>
        <nav class="navbar navbar-expand-lg bg-transparent">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="index.htm">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://discord.gg/H3rZSvn">Join our server</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="team.htm">Team</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Reviews
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="comments.htm">Comments</a>
                    <a class="dropdown-item" href="likes.htm">Likes</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Bots
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="b1.htm">Lil Moderator</a>
                    <a class="dropdown-item" href="b2.htm">Lil Log</a>
                    <a class="dropdown-item" href="b3.htm">Lil DJ</a>
                </div>
            </li>
        </ul>
    </div>
        </nav>
        <div class="start">
        <tr>
        ${tds}
        </tr>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="js/now-ui-kit.min.js"></script>
    </body>
    
    </html>`
        fs.writeFile('./likes.htm', `${html}`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
}

function EncryptCONFIG() {
    let keys = QuickEncrypt.generate(1024);
    let publicKey = keys.public;
    let c = "";

    fs.readFile('./config.json', function read(err, data) {
        if (err) throw err;
        c = data;
        console.log(data);
    });

    let encryptedText = QuickEncrypt.encrypt(`${c}`, publicKey)
    fs.writeFile('./config.json', `${encryptedText}`, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
client.login(token);