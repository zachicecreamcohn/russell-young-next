

import MySQL from '@/pages/api/_common/MySQL/MySQL'
import updateDatetimeLastModified from '@/pages/api/_common/DB/utils'




    async function saveInDB(childID, imageID) {
        const mysql = new MySQL();

        let query = `UPDATE child SET cloudflare_image_id = '${imageID}' WHERE childID = ${childID}`;
        try {
            await mysql.query(query);
            return true;

            // return {success: true}
        }
        catch (e) {
            throw new Error(e.message)
        }


    }


  
  export default async function handler(req, res) {
    try {
      
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method Not Allowed' });
            return;
          }
          
            const { childID, imageID } = req.body;
            const querySuccess = await saveInDB(childID, imageID);
            if (!querySuccess) {
                throw new Error('Error saving image in database.');
            }
            const updateSuccess = await updateDatetimeLastModified();
            if (!updateSuccess) {
                throw new Error('Error updating datetimeLastModified in database.');
            }
            res.status(200).json({success: true});
    } catch (e) {
        res.status(500).json({ message: e.message, success: false, e: e })
        }


  }
  