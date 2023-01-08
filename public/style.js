const socket = io();
let man;

do {
    man = prompt('Enter your name')
} while (!man)

let msgArea = document.getElementById('msgarea');

let textArea = document.getElementById('textarea');

textArea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        const node = document.createElement('div');
        node.classList.add('outgoing');
        const p = document.createElement('p')
        const textNode = document.createTextNode(textArea.value)
        p.appendChild(textNode)
        const user = document.createElement('h4');
        const userName = document.createTextNode(man)
        user.appendChild(userName)
        node.append(user, p)
        msgArea.appendChild(node);
        scrollToBottom()
        const mark = {
            user: man,
            massage: textArea.value.trim()
        }
        socket.emit('massage', mark)
        textArea.value = ""
    }
});

socket.on('massage',(mark)=>{
    const node = document.createElement('div');
    node.classList.add('incoming');
    const p = document.createElement('p')
    const textNode = document.createTextNode(mark.massage)
    p.appendChild(textNode)
    const user = document.createElement('h4');
    const userName = document.createTextNode(mark.user)
    user.appendChild(userName)
    node.append(user, p)
    msgArea.appendChild(node)
    scrollToBottom()
})

function scrollToBottom(){
    msgArea.scrollTop=msgArea.scrollHeight
}