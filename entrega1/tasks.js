const taref = require('./tasksmodule')
const args = process.argv.slice(2);
let tarefas = []
let table_name = ""

if (args.length === 0) 
{
    console.log("Nenhuma tabela aberta");
}
else 
{
    tarefas = taref.lerTarefas(args[0])
}

const ask = ( text = "" ) => 
{
    process.stdout.write("\n" + text + "> ");
} 

ask()

process.stdin.on("data", data => 
    {
        let params = taref.parseParams(data.toString().trim())
        switch (params[0]) {
            case "exit":
                process.exit()
            case "add":
                taref.registrarTarefa(params[1],params[2],tarefas)
                break
            case "list":
                console.table(tarefas) 
                break
            case "rm":
                // remover tarefa
                break
            case "save":
                taref.salvarTarefas(table_name,params[1],tarefas)
                table_name = params[1]
                break
            case "open":
                tarefas = taref.lerTarefas(params[1])
                break
            case "echo":
                console.log(params[1])
                break
            default:
                console.log('Comando desconhecido '+params[0])
        }
        ask()
    }
)

process.on("exit", () =>
{
    console.log("")
})