import { Text, View } from "react-native"

const messages = [
  "Cada segundo ao seu lado é um presente",
  "Você é a razão do meu sorriso",
  "Meu amor por você cresce a cada dia",
  "Você é a pessoa mais especial desse mundo",
  "Te amar é a melhor coisa que me aconteceu",
  "Você faz meu coração bater mais forte",
  "Sou grato por cada momento com você",
  "Você é meu lar, meu porto seguro",
  "Nosso amor é minha maior inspiração",
  "Você ilumina meus dias",
  "Te quero hoje, amanhã e sempre",
  "Com você, tudo faz sentido",
  "Você é meu sonho realizado",
  "Meu lugar favorito é ao seu lado",
  "Você é a melhor parte de mim",
  "Nosso amor é único, lindo e verdadeiro",
  "Cada dia ao seu lado é uma nova aventura",
  "Você é minha pessoa favorita",
  "Te amar é simples e natural",
  "Você completa minha vida",
  "Seu abraço é meu lugar seguro",
  "Você é a dona do meu coração",
  "Nada se compara ao seu amor",
  "Você é minha melhor escolha",
  "Te amo mais do que palavras podem expressar",
]

function getMessageForDay(): string {
  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  return messages[daysSinceEpoch % messages.length]
}

export function LoveMessage() {
  return (
    <View className="items-center px-6 py-5">
      <Text className="font-[Inter] text-[11px] tracking-[2px] text-white/30 uppercase mb-3">
        Mensagem do Dia
      </Text>
      <Text className="font-[Inter] text-base text-white/70 text-center leading-6">
        "{getMessageForDay()}"
      </Text>
    </View>
  )
}
