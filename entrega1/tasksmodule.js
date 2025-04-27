const fs = require('fs');
function registrarTarefa(nomeTarefa, concluido, tarefas)
{
    const tarefa = {
    data: new Date().toLocaleString(), // pega data/hora atual em formato ISO
    tarefa: nomeTarefa,
    concluido: concluido
    };

    tarefas.push(tarefa);
}

function parseParams(input)
{
    const regex = /"([^"]*)"|(\S+)/g;
    const args = [];
    let match;
  
    // Extrai todos os parâmetros (com ou sem aspas)
    while ((match = regex.exec(input)) !== null) {
      args.push(match[1] || match[2]);
    }
  
    return args;
}

function salvarTarefas(nome,nome2 = "",data)
{
    if(nome == "")
    {
        nome = nome2
        if (nome == "")
        {
            console.log("Tabela sem nome")
            return
        }
        try
        {
            tarefas = fs.writeFileSync(nome,JSON.stringify(data))
            table_name = nome
        } 
        catch (err)
        {
            console.error("Erro ao escrever tabela",err);
        }
    }
}

function lerTarefas(nome)
{
    try
    {
        return JSON.parse(fs.readFileSync(nome, { encoding: 'utf8', flag: 'r' }))
    } 
    catch (err)
    {
        console.log("Erro ao ler tabela");
        return []
    }
}

module.exports = {
    registrarTarefa,
    parseParams,
    salvarTarefas,
    lerTarefas
};