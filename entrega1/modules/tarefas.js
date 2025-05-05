const fs = require('fs')
const path = require('path')

function carregarTarefas(nomeLista) {
  try {
    const data = fs.readFileSync(path.join(__dirname, `../data/${nomeLista}.json`), 'utf8')
    return JSON.parse(data)
  } catch {
    return { ultimoId: 0, tarefas: [] }
  }
}

function salvarTarefas(tarefas,nomeLista) {
  fs.writeFileSync(path.join(__dirname, `../data/${nomeLista}.json`), JSON.stringify(tarefas, null, 2))
}

function adicionarTarefa(titulo,nomeLista) {
  const tarefas = carregarTarefas(nomeLista)
  const novaTarefa = {
    id: tarefas.ultimoId + 1,
    titulo,
    criadaEm: new Date().toISOString(),
    concluida: false
  };
  tarefas.ultimoId++;
  tarefas.tarefas.push(novaTarefa)
  salvarTarefas(tarefas,nomeLista)
}

function listarTarefas(nomeLista) {
  return carregarTarefas(nomeLista)
}

function removerTarefa(id,nomeLista) {
  const tarefas = carregarTarefas(nomeLista)
  const ultimoId = tarefas.ultimoId
  const atualizadas = tarefas.tarefas.filter(t => t.id !== id)
  salvarTarefas({ultimoId, tarefas:atualizadas},nomeLista)
}

function concluirTarefa(id,nomeLista) {
  const tarefas = carregarTarefas(nomeLista)
  const index = tarefas.tarefas.findIndex(t => t.id === id)
  if (index !== -1) {
    tarefas.tarefas[index].concluida = true
    salvarTarefas(tarefas,nomeLista)
  }
}

function filtrarTarefas(palavra,nomeLista) {
  return carregarTarefas(nomeLista).tarefas.filter(t => t.titulo.toLowerCase().includes(palavra.toLowerCase()))
}

module.exports = {
  adicionarTarefa,
  listarTarefas,
  removerTarefa,
  concluirTarefa,
  filtrarTarefas
}
