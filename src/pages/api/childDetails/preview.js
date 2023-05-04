

import MySQL from '@/MySQL'

console

const mysql = new MySQL();



    async function getData() {
        let query = 'SELECT child.subTitle2 AS color, child.cloudflare_image_id, parent.title, parent.year, parent.medium, parent.size, child.childID, series.series FROM child JOIN parent ON child.parentID = parent.parentID JOIN series ON parent.seriesID = series.seriesID WHERE child.childID =1';
        try {
            const result = await mysql.query(query)
            return result
        }
        catch (e) {
            throw new Error(e.message)
        }
    }


  
  export default async function handler(req, res) {
    try {
      const result = await getData()
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  