  function login(role) {
            document.getElementById('view-login').classList.remove('view-active');
            document.getElementById('main-nav').classList.remove('hidden');
            
            // Labels and Styles
            const label = document.getElementById('role-label');
            label.innerText = role;
            
            if(role === 'secretaria') {
                label.className = "text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-2 py-1 rounded";
                document.getElementById('view-secretaria').classList.add('view-active');
            } else if(role === 'motorista') {
                label.className = "text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded";
                document.getElementById('view-motorista').classList.add('view-active');
            } else {
                label.className = "text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 px-2 py-1 rounded";
                document.getElementById('view-paciente').classList.add('view-active');
            }
            
            showToast(`Bem-vindo, acesso ${role} autorizado.`);
        }

        function logout() {
            const views = document.querySelectorAll('.view-content');
            views.forEach(v => v.classList.remove('view-active'));
            document.getElementById('view-login').classList.add('view-active');
            document.getElementById('main-nav').classList.add('hidden');
        }

        function toggleModal(id) {
            document.getElementById(id).classList.toggle('hidden');
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            toast.innerText = msg;
            toast.classList.remove('translate-y-20');
            setTimeout(() => toast.classList.add('translate-y-20'), 4000);
        }