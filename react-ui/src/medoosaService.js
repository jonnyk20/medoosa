const medoosaService = {
  getMedoosas: async () => {
    const medoosas = await (await fetch('/medoosas')).json()
    return medoosas;
  },
  submitMedoosa: async (name, mods) => {
    const [{ value: color }, { value: eyes }, { value: mouth }, { value: arms }, { value: head }] = mods
    const medoosa = {
      name,
      color,
      eyes,
      mouth,
      arms,
      head
    }

    const res = await fetch('/medoosas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(medoosa)
    })

    console.log('RES', res)

    const json = await res.json()

    console.log('JSON', json)
  }
}

export default medoosaService;