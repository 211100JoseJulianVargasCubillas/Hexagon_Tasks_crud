import { query } from "../../database/msql";
import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class MySqlTaskRepository implements TaskRepository{

     async Createtask(uuid: string, name: string, description: string, status: boolean): Promise<Task | Error | null> {
        try {
            let sql = "INSERT INTO task(uuid, name, description, status) VALUES (?, ?, ?, ?)";
            const params: any[] = [uuid, name, description, status];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params)

            // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo

            return new Task(uuid, name, description, status);
        } catch (error) {
            console.error("Error adding task:", error);
            return error as Error;
        }  
    }

    
    async GetAllTask(): Promise<Task[] | null> {
        try {
            const sql = "SELECT * FROM tasks";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }
            const tasks: Task[] = rows.map(row => new Task(row.uuid, row.name, row.description, row.status));
            return tasks
        } catch (error) {
            console.error(error);
            return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
        }
    }
    async getById(uuid: string): Promise<Task | null> {
        try {
            const sql = "SELECT * FROM tasks WHERE uuid = ? LIMIT 1"; // SQL para obtener un usuario por uuid
            const [rows]: any = await query(sql, [uuid]); // Ejecutamos la consulta, pasando el uuid como parámetro

            if (!rows || rows.length === 0) return null; // Si no hay resultados, retornamos null        
            const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
            // Retornamos una nueva instancia de User con los datos obtenidos
            return new Task(row.uuid, row.name, row.description, row.status);
        } catch (error) {
            console.error(error);
            return null; // En caso de error, retornamos null
        }
    }
    async updateTaskById(uuid: string, name?: string, description?: string): Promise<Task | null> {
        
        const updates: { [key: string]: string } = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;

        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE tasks SET ${sqlParts.join(', ')} WHERE uuid = ?`;

        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
          
            const [updatedRows]: any = await query('SELECT * FROM tasks WHERE uuid = ?', [uuid]);
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }

            const updatedTask = new (
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].description,
                updatedRows[0].loan_status
            );

            return updatedTask;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }

    }
    async deleteTask(uuid: string): Promise<string | null> {
        try {
            const sql = "UPDATE tasks SET deleted_at = ?";
            //const sql = 'DELETE FROM users WHERE uuid = ?';
            const result: any = await query(sql, [uuid]);
            if (result[0].affectedRows === 0){
                return null;
            } 

            return 'Task deleted successfully.';
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }

}