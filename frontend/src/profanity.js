import leoProfanity from 'leo-profanity'

const initProfanity = () => {
  const dictionary = leoProfanity.getDictionary('ru')
  leoProfanity.add(dictionary)
  return leoProfanity
}

export default initProfanity
