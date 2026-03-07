// Virtual Linux FileSystem
const fs = { '/': ['bin', 'home', 'etc', 'var'], '/bin': ['nmap', 'msfconsole', 'sqlmap'], '/home/user': ['notes.txt', 'exploit.py'] };

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        item.classList.add('active');
        document.getElementById(target).classList.add('active');
        if(target === 'terminal') document.getElementById('terminal-input').focus();
    });
});

// Terminal Engine
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const fullCmd = termInput.value.trim();
        if(!fullCmd) return;
        
        appendLog(`user@appx:~$ ${fullCmd}`, 'white');
        handleLinuxCommand(fullCmd.toLowerCase());
        termInput.value = '';
    }
});

function handleLinuxCommand(cmdLine) {
    const args = cmdLine.split(' ');
    const cmd = args[0];
    
    switch(cmd) {
        case 'help':
            appendLog('Pre-installed: nmap, msfconsole, sqlmap, ls, clear, whoami, apt');
            break;
        case 'ls':
            appendLog('bin/  etc/  home/  var/', '#1e90ff');
            break;
        case 'whoami':
            appendLog('user (uid=1000)');
