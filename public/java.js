const API_URL = 'http://localhost:3333'

// login 

async function Login() {
    const email = document.getElementById('email').value 
    const password = document.getElementById('password').value
    const admCheck = document.getElementById('admCheck').checked;


    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email, password})
    });

const data = await res.json();
console.log("RESPOSTA DO BACK:", data);

    if (!res.ok) {
        alert(data.message || "Login inválido!");
        return;
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('adm', data.user.adm)


if(admCheck && !data.user.adm){
    alert('você marcou que é adm, porém não tem permissão!')
    return;
} 

if(data.user.adm){
    window.location.href = 'listUsers.html'
} else{
    window.location.href = 'homePage.html'
}

}

// reutilizavel request  

async function api(method, route, body) {
    const token = localStorage.getItem('token')

    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    if (body && method !== 'DELETE') {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return fetch(`${API_URL}${route}`, options);
}

// listar users

async function loadUsers() {
    const res = await api('GET', '/users')
    const users = (await res.json()).data

    const list = document.getElementById('list')
    list.innerHTML = ''

    users.forEach(u => {
        const div = document.createElement('div')

div.innerHTML = `
    <div class="bg-slate-800/70 border border-slate-700 p-5 rounded-xl shadow-xl hover:scale-[1.02] transition-all">
        <p class="text-slate-300 font-mono text-sm mb-2">
            <strong>ID:</strong> ${u.id}
        </p>
        <p class="text-white text-lg mb-4">
            ${u.email}
        </p>

        <button 
            onclick="deleteUser('${u.id}')"
            class="px-4 py-2 rounded-lg bg-red-600/80 text-white font-semibold hover:bg-red-700 shadow-lg hover:scale-105 transition-all"
        >
            Deletar
        </button>
    </div>

`;

        list.appendChild(div)
    })
}

// criar users

async function createUser() {
    const email = document.getElementById("emailCreate").value
    const password = document.getElementById("passwordCreate").value

    const res = await api('POST', '/users', { email, password });

    const data = await res.json()
    alert('Usuário criado!')
    loadUsers()
}

// deleta users 

async function deleteUser(id) {
    await api('DELETE', `/users/${id}`)
    alert("usuario deletado");
    loadUsers()
}

