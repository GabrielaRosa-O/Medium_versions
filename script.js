let trips = [
            { time: '06:30', dest: 'Sorocaba (UNESP)', driver: 'Roberto Carlos', status: 'Confirmado', color: 'emerald' },
            { time: '08:00', dest: 'São Paulo (INCOR)', driver: 'Silvana Mendes', status: 'Confirmado', color: 'emerald' },
            { time: '13:00', dest: 'Botucatu (HC)', driver: 'Marcos Aurélio', status: 'Pendente', color: 'amber' }
        ];

        function login(type) {
            document.getElementById('view-login').classList.remove('view-active');
            document.getElementById('main-nav').classList.remove('hidden');
            
            const badge = document.getElementById('user-role-badge');
            badge.innerText = type;

            if(type === 'secretaria') {
                document.getElementById('view-secretaria').classList.add('view-active');
                renderTrips();
            } else if(type === 'motorista') {
                document.getElementById('view-motorista').classList.add('view-active');
            } else {
                document.getElementById('view-paciente').classList.add('view-active');
            }
            
            showToast(`Logado como ${type.toUpperCase()}`);
        }

        function logout() {
            const views = document.querySelectorAll('.view-content');
            views.forEach(v => v.classList.remove('view-active'));
            document.getElementById('view-login').classList.add('view-active');
            document.getElementById('main-nav').classList.add('hidden');
        }

        function renderTrips() {
            const body = document.getElementById('trips-table-body');
            body.innerHTML = trips.map(t => `
                <tr class="text-sm">
                    <td class="px-6 py-4 font-bold">${t.time}</td>
                    <td class="px-6 py-4">${t.dest}</td>
                    <td class="px-6 py-4">${t.driver}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 rounded-full text-[10px] font-bold bg-${t.color}-100 text-${t.color}-700 uppercase">${t.status}</span>
                    </td>
                </tr>
            `).join('');
        }

        function toggleModal(id) {
            document.getElementById(id).classList.toggle('hidden');
        }

        function addTrip() {
            const dest = document.getElementById('new-dest').value;
            const time = document.getElementById('new-time').value;
            const driver = document.getElementById('new-driver').value;

            if(!dest || !time) return showToast("Preencha todos os campos");

            trips.unshift({ time, dest, driver, status: 'Confirmado', color: 'emerald' });
            renderTrips();
            toggleModal('modal-viagem');
            showToast("Viagem agendada com sucesso!");
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = msg;
            toast.classList.remove('translate-y-20');
            setTimeout(() => toast.classList.add('translate-y-20'), 3000);
        }