class LivroDao{
    constructor(db){
        this.db = db;
    }

    lista(){
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM livros',
                (error, result) => {
                   if(error) return reject('Não foi possivel');
                
                    return resolve(result);
                }
            )   
        });
    }

    adiciona(livro){
      return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO livros (titulo, preco, descricao) VALUES (?,?,?)`, [livro.titulo, livro.preco, livro.descricao]),
            function(error){
                if(error){
                    console.log(error);
                    return reject('Não foi possivel cadastrar o livro');
                }
            }
            return resolve();
      });  
    }

    remove(id){
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM livros where id = ?`, [id]),
            function(error){
                if(error){
                    console.log(error);
                    return reject('Não foi possivel remoevr o livro');
                }
            }
            return resolve();
      });  
    }
    
    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this.db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this.db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

}

module.exports = LivroDao;