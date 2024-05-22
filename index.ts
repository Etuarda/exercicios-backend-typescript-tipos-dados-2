const fs = require('fs');

const lerArquivos = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
};

const escreverDados = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Usuario = {
    nome: string;
    email: string;
    cpf: string;
    profissao?: string;
    endereco: Endereco | null;
};

type Endereco = {
    cep: string;
    rua: string;
    complemento?: string;
    bairro: string;
    cidade: string;
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivos() as Usuario[];
    bd.push(dados);
    escreverDados(bd);
    return dados;
};

const listarUsuarios = (profissao?: string): Usuario[] => {
    const bd = lerArquivos() as Usuario[];
    if (profissao) {
        return bd.filter(usuario => usuario.profissao === profissao);
    }
    return bd;
};

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    return usuario;
};

const atualizarUsuario = (cpf: string, dadosAtualizados: Partial<Usuario>): Usuario => {
    const bd = lerArquivos() as Usuario[];
    const usuarioIndex = bd.findIndex(usuario => usuario.cpf === cpf);

    if (usuarioIndex === -1) {
        throw new Error('Usuário não encontrado');
    }

    const usuarioAtual = bd[usuarioIndex];
    const usuarioAtualizado = Object.assign({}, usuarioAtual, dadosAtualizados);
    bd[usuarioIndex] = usuarioAtualizado;
    escreverDados(bd);

    return usuarioAtualizado;
};

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivos() as Usuario[];
    const usuarioIndex = bd.findIndex(usuario => usuario.cpf === cpf);

    if (usuarioIndex === -1) {
        throw new Error('Usuário não encontrado');
    }

    const usuarioExcluido = bd.splice(usuarioIndex, 1)[0];
    escreverDados(bd);

    return usuarioExcluido;
};

// Exemplo de uso

const novoUsuario: Usuario = {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    cpf: "123.456.789-00",
    profissao: "Engenheira",
    endereco: {
        cep: "12345-678",
        rua: "Rua das Flores",
        bairro: "Centro",
        cidade: "São Paulo",
        complemento: "Apto 101"
    }
};

// // Cadastrando um novo usuário
// cadastrarUsuario(novoUsuario);

// // Detalhando um usuário
// const usuarioDetalhado = detalharUsuario("123.456.789-00");
// console.log('Detalhado:', usuarioDetalhado);

// // Atualizando um usuário
// const usuarioAtualizado = atualizarUsuario("123.456.789-00", { nome: "Maria Silva Santos" });
// console.log('Atualizado:', usuarioAtualizado);

// // Excluindo um usuário
// const usuarioExcluido = excluirUsuario("123.456.789-00");
// console.log('Excluído:', usuarioExcluido);

// // Listando todos os usuários
// const todosUsuarios = listarUsuarios();
// console.log('Todos usuários:', todosUsuarios);

// Listando usuários por profissão
const usuariosEngenheiros = listarUsuarios("Engenheira");
console.log('Engenheiros:', usuariosEngenheiros);

