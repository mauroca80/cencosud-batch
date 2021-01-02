const csv = require('csv-parser');
const fs = require('fs');
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'database-2.chqrt8xumqyz.us-east-2.rds.amazonaws.com',
    database: 'creditos',
    password: 'prueba1234',
    port: 5432,
})

const results = [];
var query = "";

fs.createReadStream('creditos.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => {
      
        query += "update  creditos  set monto="+data.monto+"+cliente.montoactual from " +
        "(SELECT  monto AS montoactual FROM creditos WHERE correo='" +data.correo+ "' and tienda='"+ data.tienda+"') as cliente " +
        "where correo='"+ data.correo +"' and tienda='"+data.tienda+"';\n";
        results.push(data)

    })
    .on('end', () => {
        
        pool.query(query, (error, results) => {
            if (error) {
                    throw error
                }
               console.log('créditos actualizados');
               console.log('end process batch node');
            }
        )
  });