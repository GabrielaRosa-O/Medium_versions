 tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        primary: '#1d4ed8', // Blue 700
                        secondary: '#10b981', // Emerald 500
                        accent: '#3b82f6', // Blue 500
                        dark: '#1e293b', // Slate 800
                        light: '#f8fafc', // Slate 50
                        danger: '#ef4444', // Red 500
                        warning: '#f59e0b', // Amber 500
                    }
                }
            }
        }

let viewAtual = 'login';
        
        // Dados Mockados - Solicitações do Paciente Logado
        let solicitacoesPaciente = [
            {
                protocolo: "MED-2026-A01",
                data: "30/06/2026 14:00",
                tipo: "Consulta Médica",
                destino: "Hospital Regional",
                status: "Aprovado - Van 02",
                statusColor: "text-secondary",
                statusBg: "bg-emerald-100"
            },
            {
                protocolo: "MED-2026-A02",
                data: "15/07/2026 09:30",
                tipo: "Exame",
                destino: "Clínica de Imagem Centro",
                status: "Aguardando Análise",
                statusColor: "text-amber-600",
                statusBg: "bg-amber-100"
            }
        ];

        // Dados Mockados - Rota do Motorista
        let rotaMotorista = [
            {
                id: 1,
                paciente: "Dona Maria José",
                endereco: "Rua das Flores, 123 - Centro",
                destino: "Hospital Regional",
                hora: "13:30",
                status: "pendente" // pendente, embarcado, concluido
            },
            {
                id: 2,
                paciente: "João da Silva",
                endereco: "Av. Principal, 45 - Bairro Alto",
                destino: "Hospital Regional",
                hora: "13:50",
                status: "pendente"
            }
        ];

        // Dados Mockados Globais
        let todasRequisicoes = [
            { prot: "MED-2026-X89", data: "30/06 14:00", pac: "Roberto Santos", dest: "Clínica de Olhos", prio: "Normal", prioColor: "text-slate-500 bg-slate-100", status: "Aguardando" },
            { prot: solicitacoesPaciente[1].protocolo, data: solicitacoesPaciente[1].data, pac: "João da Silva", dest: solicitacoesPaciente[1].destino, prio: "Normal", prioColor: "text-slate-500 bg-slate-100", status: "Aguardando" },
            { prot: "MED-2026-F44", data: "30/06 16:30", pac: "Ana de Lourdes (Idosa)", dest: "Hemodiálise Sta. Casa", prio: "Preferencial", prioColor: "text-blue-600 bg-blue-100", status: "Aguardando" }
        ];

        // --- Funções de Navegação e Autenticação ---
        
        function login(perfil) {
            document.getElementById('view-login').classList.add('hidden');
            
            if(perfil === 'paciente') {
                document.getElementById('view-paciente').classList.remove('hidden');
                document.getElementById('view-paciente').classList.add('flex');
                renderizarSolicitacoesPaciente();
            } 
            else if(perfil === 'secretaria') {
                document.getElementById('view-secretaria').classList.remove('hidden');
                document.getElementById('view-secretaria').classList.add('flex');
                mudarAbaSecretaria('dashboard'); // Carrega a view inicial da secretaria
            }
            else if(perfil === 'motorista-chefe') {
                document.getElementById('view-motorista-chefe').classList.remove('hidden');
                document.getElementById('view-motorista-chefe').classList.add('flex');
            }
            else if(perfil === 'motorista') {
                document.getElementById('view-motorista').classList.remove('hidden');
                document.getElementById('view-motorista').classList.add('flex');
                renderizarRotaMotorista();
            }
        }

        function logout() {
            // Esconde todas as views
            document.getElementById('view-paciente').classList.add('hidden');
            document.getElementById('view-paciente').classList.remove('flex');
            
            document.getElementById('view-secretaria').classList.add('hidden');
            document.getElementById('view-secretaria').classList.remove('flex');

            document.getElementById('view-motorista-chefe').classList.add('hidden');
            document.getElementById('view-motorista-chefe').classList.remove('flex');
            
            document.getElementById('view-motorista').classList.add('hidden');
            document.getElementById('view-motorista').classList.remove('flex');
            
            // Mostra login
            document.getElementById('view-login').classList.remove('hidden');
        }

        // --- Funções Auxiliares UI ---

        function toggleModal(id) {
            const modal = document.getElementById(id);
            if (modal.classList.contains('hidden')) {
                modal.classList.remove('hidden');
            } else {
                modal.classList.add('hidden');
            }
        }

        function gerarProtocolo() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let str = '';
            for(let i=0; i<4; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return `MED-2026-${str}`;
        }

        // --- Lógica da Secretaria (Tabs) ---
        function mudarAbaSecretaria(abaId) {
            // Resetar botões do menu lateral
            document.querySelectorAll('#menu-secretaria .menu-item').forEach(el => {
                el.classList.remove('bg-primary/20', 'text-accent', 'border-r-4', 'border-accent');
                el.classList.add('text-slate-300');
            });
            
            // Ativar botão clicado
            const btnAtivo = document.getElementById(`link-${abaId}`);
            if(btnAtivo) {
                btnAtivo.classList.remove('text-slate-300');
                btnAtivo.classList.add('bg-primary/20', 'text-accent', 'border-r-4', 'border-accent');
            }

            // Esconder todas as abas
            document.getElementById('aba-dashboard').classList.add('hidden');
            document.getElementById('aba-dashboard').classList.remove('block');
            document.getElementById('aba-solicitacoes').classList.add('hidden');
            document.getElementById('aba-solicitacoes').classList.remove('block');
            document.getElementById('aba-rotas').classList.add('hidden');
            document.getElementById('aba-rotas').classList.remove('block');
            document.getElementById('aba-frota').classList.add('hidden');
            document.getElementById('aba-frota').classList.remove('block');

            // Mostrar a aba selecionada
            document.getElementById(`aba-${abaId}`).classList.remove('hidden');
            document.getElementById(`aba-${abaId}`).classList.add('block');

            // Renderizar dados específicos da aba
            if(abaId === 'dashboard' || abaId === 'solicitacoes') {
                renderizarTabelaSecretaria();
            }
        }

        // --- Lógica do Paciente ---

        function renderizarSolicitacoesPaciente() {
            const container = document.getElementById('lista-solicitacoes-paciente');
            container.innerHTML = '';

            if(solicitacoesPaciente.length === 0) {
                container.innerHTML = `<p class="text-slate-500 text-sm">Nenhuma solicitação encontrada.</p>`;
                return;
            }

            solicitacoesPaciente.forEach(sol => {
                const html = `
                <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Protocolo</span>
                            <h4 class="font-bold text-primary">${sol.protocolo}</h4>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${sol.statusBg} ${sol.statusColor}">
                            ${sol.status}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                        <div>
                            <p class="text-xs text-slate-400">Data/Hora</p>
                            <p class="font-medium"><i class="fa-regular fa-calendar mr-1"></i> ${sol.data}</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400">Tipo</p>
                            <p class="font-medium"><i class="fa-solid fa-stethoscope mr-1"></i> ${sol.tipo}</p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-xs text-slate-400">Destino</p>
                            <p class="font-medium"><i class="fa-solid fa-building-user mr-1"></i> ${sol.destino}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button class="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium transition">Detalhes</button>
                        <button class="flex-1 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-danger py-2 rounded-lg text-sm font-medium transition">Cancelar</button>
                    </div>
                </div>
                `;
                container.innerHTML += html;
            });
        }

        function enviarSolicitacao(e) {
            e.preventDefault();
            
            // Pega dados básicos do form
            const tipo = document.getElementById('tipo-atendimento').value;
            const destino = document.getElementById('destino').value;
            // Pega a data e formata simples
            const rawDate = document.getElementById('data-hora').value;
            const dateObj = new Date(rawDate);
            const dataFormatada = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth()+1).toString().padStart(2, '0')}/2026 ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

            const novaSol = {
                protocolo: gerarProtocolo(),
                data: dataFormatada,
                tipo: tipo,
                destino: destino,
                status: "Aguardando Análise",
                statusColor: "text-amber-600",
                statusBg: "bg-amber-100"
            };

            // Adiciona no topo da lista do paciente
            solicitacoesPaciente.unshift(novaSol);
            
            // Adiciona no banco geral mockado (para a secretaria ver)
            todasRequisicoes.unshift({
                prot: novaSol.protocolo,
                data: dataFormatada,
                pac: "João da Silva", // Paciente logado
                dest: destino,
                prio: "Normal",
                prioColor: "text-slate-500 bg-slate-100",
                status: "Aguardando"
            });

            // Fecha modal e re-renderiza
            toggleModal('modal-solicitar');
            renderizarSolicitacoesPaciente();
            document.getElementById('form-solicitacao').reset();

            alert(`Solicitação gerada com sucesso! Protocolo: ${novaSol.protocolo}`);
        }

        // --- Lógica Compartilhada Secretaria ---

        function renderizarTabelaSecretaria() {
            const tbodyDashboard = document.getElementById('tabela-secretaria-dashboard');
            const tbodyTodas = document.getElementById('tabela-secretaria-todas');
            
            if(tbodyDashboard) tbodyDashboard.innerHTML = '';
            if(tbodyTodas) tbodyTodas.innerHTML = '';

            todasRequisicoes.forEach((r, index) => {
                // Tabela reduzida do Dashboard (só as aguardando e sem ações complexas)
                if(tbodyDashboard && index < 3) {
                    tbodyDashboard.innerHTML += `
                    <tr class="hover:bg-slate-50 transition border-b border-slate-50">
                        <td class="p-4 font-bold text-slate-700">${r.prot}</td>
                        <td class="p-4 font-medium text-slate-800">${r.pac}</td>
                        <td class="p-4 text-slate-600">${r.dest}</td>
                        <td class="p-4">
                            <span class="px-2 py-1 rounded text-xs font-semibold ${r.prioColor}">${r.prio}</span>
                        </td>
                    </tr>
                    `;
                }

                // Tabela completa da aba Solicitações
                if(tbodyTodas) {
                    tbodyTodas.innerHTML += `
                    <tr class="hover:bg-slate-50 transition border-b border-slate-50">
                        <td class="p-4 text-slate-600">${r.data}</td>
                        <td class="p-4 font-bold text-slate-700">${r.prot}</td>
                        <td class="p-4 font-medium text-slate-800">${r.pac}</td>
                        <td class="p-4 text-slate-600">${r.dest}</td>
                        <td class="p-4">
                            <span class="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">${r.status}</span>
                        </td>
                        <td class="p-4 text-center">
                            <button class="text-primary hover:text-blue-800 text-sm font-medium border border-primary px-3 py-1 rounded-lg transition" title="Atribuir Veículo"> Atribuir à Rota</button>
                        </td>
                    </tr>
                    `;
                }
            });
        }

        function enviarEmergencia(e) {
            e.preventDefault();
            
            const paciente = document.getElementById('em-paciente').value;
            const estado = document.getElementById('em-estado').value;
            const destino = document.getElementById('em-destino').value;

            // Fechar modal secretaria/chefe
            toggleModal('modal-emergencia');
            document.getElementById('form-emergencia').reset();
            
            // Simula o sistema backend recebendo e disparando para o motorista
            alert("Emergência Despachada para a frota mais próxima! O sistema acompanhará o trajeto.");

            // Mostrar notificação na tela do motorista (Simulação cruzada)
            document.getElementById('alerta-nome').innerText = paciente;
            document.getElementById('alerta-estado').innerText = estado;
            document.getElementById('alerta-dest').innerText = destino;
            document.getElementById('alerta-motorista').classList.remove('hidden');
        }

        // --- Lógica do Motorista ---

        function renderizarRotaMotorista() {
            const container = document.getElementById('lista-rota-motorista');
            container.innerHTML = '';

            rotaMotorista.forEach((parada, index) => {
                
                let icon = 'fa-location-dot text-slate-500';
                let btnHtml = `<button onclick="marcarEmbarque(${parada.id})" class="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg font-medium text-sm transition mt-3">Confirmar Embarque</button>`;
                let opacity = 'opacity-100';

                if(parada.status === 'embarcado') {
                    icon = 'fa-user-check text-secondary';
                    btnHtml = `<button onclick="marcarConcluido(${parada.id})" class="w-full bg-secondary hover:bg-emerald-600 text-white py-2 rounded-lg font-medium text-sm transition mt-3">Registrar Desembarque</button>`;
                } else if(parada.status === 'concluido') {
                    icon = 'fa-check-circle text-slate-400';
                    btnHtml = `<div class="w-full bg-slate-800 text-slate-400 py-2 rounded-lg font-medium text-sm text-center mt-3"><i class="fa-solid fa-check"></i> Finalizado</div>`;
                    opacity = 'opacity-50';
                }

                const card = `
                <div class="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg ${opacity} transition relative">
                    <div class="absolute -left-2 top-6 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center z-10">
                        <div class="w-2 h-2 rounded-full ${parada.status === 'concluido' ? 'bg-slate-500' : 'bg-primary'}"></div>
                    </div>
                    <div class="ml-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-white text-lg">${parada.paciente}</h3>
                            <span class="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded font-bold">${parada.hora}</span>
                        </div>
                        <p class="text-sm text-slate-400 mb-1"><i class="fa-solid fa-map-pin text-primary w-4"></i> ${parada.endereco}</p>
                        <p class="text-sm text-slate-400"><i class="fa-solid fa-flag-checkered text-secondary w-4"></i> Destino: ${parada.destino}</p>
                        
                        ${btnHtml}
                    </div>
                </div>
                `;
                container.innerHTML += card;
            });
        }

        function marcarEmbarque(id) {
            const index = rotaMotorista.findIndex(r => r.id === id);
            if(index > -1) {
                rotaMotorista[index].status = 'embarcado';
                // Para simular o upload de assinatura da documentação
                alert(`Embarque confirmado. O protocolo digital de ${rotaMotorista[index].paciente} foi assinado no sistema.`);
                renderizarRotaMotorista();
            }
        }

        function marcarConcluido(id) {
            const index = rotaMotorista.findIndex(r => r.id === id);
            if(index > -1) {
                rotaMotorista[index].status = 'concluido';
                renderizarRotaMotorista();
            }
        }

        function reportarProblema() {
            // Simulação simples de alert box customizada
            let motivo = prompt("Selecione o problema:\n1. Paciente Ausente\n2. Falha no Veículo\n3. Trânsito/Atraso", "1");
            if(motivo) {
                alert("Problema reportado à Secretaria e ao Motorista Chefe. O log foi gravado no sistema.");
            }
        }

        function aceitarEmergencia() {
            document.getElementById('alerta-motorista').classList.add('hidden');
            alert("A rota de emergência foi adicionada ao seu GPS. Siga imediatamente para o local de coleta.");
            
            // Adiciona no topo da rota do motorista
            rotaMotorista.unshift({
                id: 999,
                paciente: document.getElementById('alerta-nome').innerText + " (EMERGÊNCIA)",
                endereco: "Localização de Origem (Aguardando GPS)",
                destino: document.getElementById('alerta-dest').innerText,
                hora: "AGORA",
                status: "pendente"
            });
            renderizarRotaMotorista();
        }