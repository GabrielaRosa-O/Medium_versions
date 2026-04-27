let currentRole = '';

        const config = {
            paciente: {
                badge: 'Paciente / Cidadão',
                subtitle: 'Agendamentos e Confirmação de Presença.',
                nav: [
                    { icon: 'fa-home', label: 'Painel Geral', section: 'paciente-dashboard' },
                    { icon: 'fa-calendar-alt', label: 'Solicitar Transporte', section: 'paciente-dashboard' },
                    { icon: 'fa-map-pin', label: 'Meus Endereços', section: 'paciente-dashboard' }
                ]
            },
            secretaria: {
                badge: 'Gestão de Saúde',
                subtitle: 'Controle Administrativo e Frota.',
                nav: [
                    { icon: 'fa-chart-pie', label: 'Dashboard Geral', section: 'secretaria-dashboard' },
                    { icon: 'fa-route', label: 'Rotas e Escalas', section: 'secretaria-dashboard' },
                    { icon: 'fa-bus', label: 'Gestão de Frota', section: 'secretaria-dashboard' },
                    { icon: 'fa-file-medical-alt', label: 'Relatórios Médicos', section: 'secretaria-dashboard' }
                ]
            },
            motorista: {
                badge: 'Operacional / Motorista',
                subtitle: 'Execução de Viagens e Emergências.',
                nav: [
                    { icon: 'fa-truck-loading', label: 'Minhas Rotas', section: 'motorista-dashboard' },
                    { icon: 'fa-ambulance', label: 'Emergências', section: 'motorista-dashboard' },
                    { icon: 'fa-clipboard-list', label: 'Escala de Trabalho', section: 'motorista-dashboard' }
                ]
            }
        };

        function login(role) {
            currentRole = role;
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app-shell').classList.remove('hidden');
            
            const userConfig = config[role];
            document.getElementById('user-role-badge').innerText = userConfig.badge;
            document.getElementById('page-subtitle').innerText = userConfig.subtitle;
            
            const nav = document.getElementById('sidebar-nav');
            nav.innerHTML = '';
            userConfig.nav.forEach((item, index) => {
                const a = document.createElement('a');
                a.href = "#";
                a.className = `sidebar-link flex items-center px-6 py-4 text-gray-600 hover:bg-gray-50 transition-all ${index === 0 ? 'active' : ''}`;
                a.innerHTML = `<i class="fas ${item.icon} w-6"></i> <span>${item.label}</span>`;
                nav.appendChild(a);
            });

            hideAllSections();
            document.getElementById(`section-${role}-dashboard`).classList.remove('hidden-section');
            showToast(`Logado como ${role.toUpperCase()}`);
        }

        function logout() {
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('app-shell').classList.add('hidden');
            hideAllSections();
        }

        function hideAllSections() {
            document.querySelectorAll('.hidden-section').forEach(s => s.classList.add('hidden-section'));
        }

        function showModal(id) {
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('flex');
        }

        function hideModal(id) {
            document.getElementById(id).classList.add('hidden');
            document.getElementById(id).classList.remove('flex');
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            toast.innerText = msg;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.remove('translate-y-20'), 100);
            setTimeout(() => {
                toast.classList.add('translate-y-20');
                setTimeout(() => toast.classList.add('hidden'), 500);
            }, 3000);
        }

        // Funções de Processo
        function confirmSolicitacao() {
            const prot = "MED-" + Math.floor(Math.random() * 90000 + 10000);
            showToast(`Solicitação Protocolada: #${prot}`);
            hideModal('modal-solicitacao-paciente');
            
            // Adicionar ao histórico simulado
            const table = document.getElementById('patient-history-table');
            const row = `<tr>
                <td class="px-6 py-4 font-mono font-bold text-blue-600">#${prot}</td>
                <td class="px-6 py-4">Hoje, Agora</td>
                <td class="px-6 py-4">Pendente</td>
                <td class="px-6 py-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">SOLICITADO</span></td>
            </tr>`;
            table.innerHTML = row + table.innerHTML;
        }

        function triggerEmergency() {
            hideModal('modal-emergencia');
            showToast("⚠️ ALERTA CRÍTICO DISPARADO!");
            
            // Mostrar para o motorista (se estiver nesse perfil)
            if(currentRole === 'motorista') {
                setTimeout(() => {
                    document.getElementById('emergency-alert').classList.remove('hidden');
                    // Som de alerta simulado seria disparado aqui
                }, 500);
            }
        }

        function acceptEmergency() {
            document.getElementById('emergency-alert').classList.add('hidden');
            showToast("Emergência Aceita. GPS em navegação...");
        }

        function hideEmergency() {
            document.getElementById('emergency-alert').classList.add('hidden');
        }

        function reportProblem(tipo) {
            showToast(`Problema reportado: ${tipo}. Central notificada.`);
        }

        function saveData(msg) {
            showToast(msg);
            hideModal('modal-cadastro-frota');
            hideModal('modal-rota');
        }

        function exportData() {
            showToast("Gerando arquivo PDF/Excel... Download iniciado.");
        }