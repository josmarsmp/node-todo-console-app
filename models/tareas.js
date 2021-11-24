const Tarea = require('./tarea')


class Tareas {

    _listado = {};

    get listadoArr() {
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if( this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        });

    }

    crearTarea( desc = '') {

        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        
        console.log('\n');
        this.listadoArr.forEach( (tarea, index ) => {

            const idx = `${index + 1}.`.green;
            const { desc, completadoEn } = tarea;

            const estado = ( completadoEn )
                            ? 'Completado'.green
                            : 'Pendiente'.yellow

            console.log(`${idx} ${desc} :: ${estado}`);

        })

    }

    listarPendientesCompletadas( completadas = true ) {

        console.log('\n');
        let idx = 1;
        this.listadoArr.forEach( ( tarea ) => {

            const { desc,  completadoEn } = tarea;
            const status = completadoEn
                            ? true
                            : false;

            const statusDesc = status 
                                ? `${completadoEn}`.green
                                : 'Pendiente'.yellow

            if( completadas === status ) {
                console.log(`${idx.toString().green}. ${desc} :: ${statusDesc}`);
                idx++;
            }

        });

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

}

module.exports = Tareas;