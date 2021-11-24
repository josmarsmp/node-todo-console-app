require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareaBorrar(tareas.listadoArr);

                if (id !== '0') {
                    const ok = await confirmar('Esta seguro que desea eliminar esta tarea?'.red);

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente'.green);
                    }
                }
                break;
            case '0':

                break;
        }

        guardarDB(tareas.listadoArr);


        await pausa();


    } while (opt !== '0');

}

main();