let participantes = [
  {
    nome: "Luna da luz",
    email: "lunadaluzz@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 13, 9),
    dataCheckin: null
  },  
  {
    nome: "Luana Pereira",
    email: "luana@gmail.com",
    dataInscricao: new Date(2024, 3, 9, 13, 19),
    dataCheckin: new Date(2024, 3, 3, 22, 0)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 7, 15, 45),
    dataCheckin: new Date(2024, 3, 8, 18, 20)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 11, 30),
    dataCheckin: new Date(2024, 3, 6, 10, 15)
  },
  {
    nome: "Carlos Santos",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 3, 12, 9, 0),
    dataCheckin: new Date(2024, 3, 13, 16, 45)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 3, 3, 14, 20),
    dataCheckin: new Date(2024, 3, 4, 12, 30)
  },
  {
    nome: "Pedro Ferreira",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 16, 0),
    dataCheckin: new Date(2024, 3, 11, 8, 45)
  },
  {
    nome: "Juliana Lima",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 18, 10),
    dataCheckin: new Date(2024, 3, 2, 20, 30)
  },
  {
    nome: "Lucas Rodrigues",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 3, 6, 10, 5),
    dataCheckin: new Date(2024, 3, 7, 14, 15)
  },
  {
    nome: "Carolina Fernandes",
    email: "carolina@gmail.com",
    dataInscricao: new Date(2024, 3, 8, 12, 40),
    dataCheckin: new Date(2024, 3, 9, 19, 0)
  }
];

const criarnovoparticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
    let dataCheckin = dayjs(Date.now())
    .to(participante.dataCheckin)

    // condicional
    if(participante.dataCheckin == null) {
      dataCheckin = `
      <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"

    >  

      confirmar check-in
      </button>
      `

    }

    return `
<tr>
    <td>
      <strong>
      ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
      </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
  </tr>
`
}

const atualizarlista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarnovoparticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
   }

atualizarlista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )
  
  if(participanteExiste) {
    alert('Email ja cadastrado!')
    return
  }

participantes = [participante, ...participantes]
atualizarlista(participantes)

// limpar formulario
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'tem certeza que desela fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }


  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar check-in do participante
  participante.dataCheckin = new Date()

  //atualizar a lista de participantes.
  atualizarlista(participantes)

}