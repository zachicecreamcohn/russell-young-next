import MySQL from '@/MySQL'

console

const mysql = new MySQL();



  async function test() {
   try {
    const result = await mysql.query("SELECT * FROM `child`")
    return result
    } catch (e) {
        throw new Error(e.message)
    }
    }


  
  export default async function handler(req, res) {
    try {
      const result = await test()
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  