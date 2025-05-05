const args = process.argv.slice(2)  // argumentos de inicialização
const readline = require('readline')
const tarefas = require('./modules/tarefas')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let nomeLista = "tarefas" // nome de lista padrão

function menu() {
  console.log('\n1. Adicionar tarefa')
  console.log('2. Listar tarefas')
  console.log('3. Remover tarefa')
  console.log('4. Concluir tarefa')
  console.log('5. Filtrar tarefas por palavra')
  console.log('6. Mudar lista')
  console.log('7. Sair\n')

  rl.question('Escolha uma opção: ', (opcao) => {
    console.clear()
    switch (opcao) {
      case '1':
        rl.question('Digite o título da tarefa: ', (titulo) => {
          tarefas.adicionarTarefa(titulo,nomeLista)
          console.log('✅ Tarefa adicionada!')
          menu()
        })
        break
      case '2':
        let lista = tarefas.listarTarefas(nomeLista)
        console.log('\n📋 Lista de Tarefas:')
        lista.tarefas.forEach(t => {
          const dataLocal = new Date(t.criadaEm).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
          });
          console.log(`[${t.concluida ? '✔' : ' '}] ${t.id} | ${t.titulo} | ${dataLocal}`)
        })
        menu()
        break
      case '3':
        rl.question('ID da tarefa a remover: ', (id) => {
          tarefas.removerTarefa(Number(id),nomeLista)
          console.log('🗑️ Tarefa removida.')
          menu()
        })
        break
      case '4':
        rl.question('ID da tarefa a concluir: ', (id) => {
          tarefas.concluirTarefa(Number(id),nomeLista)
          console.log('🏁 Tarefa marcada como concluída.')
          menu()
        })
        break
      case '5':
        rl.question('Palavra-chave para filtrar: ', (palavra) => {
          const filtradas = tarefas.filtrarTarefas(palavra,nomeLista)
          console.log('\n🔍 Tarefas encontradas:')
          filtradas.forEach(t => {
            console.log(`- [${t.concluida ? '✔' : ' '}] ${t.id} | ${t.titulo}`)
          })
          menu()
        })
        break
      case '6':
          rl.question('Nome da tabela: ', (nome) => {
            nomeLista = nome
            menu()
          })
          break
      case '7':
        console.log('Encerrando...')
        rl.close()
        break
      default:
        console.log('Opção inválida!')
        menu()
    }
  })
}

if (args.length === 0){
  console.log('Abrindo lista padrão \n');
}
else {
  nomeLista = args[0]
}

menu()
