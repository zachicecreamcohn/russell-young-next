

import MySQL from '@/pages/api/_common/MySQL/MySQL'


const mysql = new MySQL();




  export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method Not Allowed' });
            return;
          }
      // get childID from the request
      const childID = req.body.childID;
      if (!childID) {
        res.Error({"message": "No childID provided.", "success": false});
        return;
      }

      try {
        const data = await mysql.query(`
          SELECT COUNT(*), variations.*, d1.*, d2.*
          FROM variations
          LEFT OUTER JOIN dealers AS d1 ON variations.consigned = d1.dealerid
          LEFT OUTER JOIN dealers AS d2 ON variations.reconsigned = d2.dealerid
          WHERE variations.childid = ? AND hide = 0
          GROUP BY variations.varid, d1.dealerid, d2.dealerid
          ORDER BY variations.codeid, variations.date DESC
        `, [childID]);
    
        const result = {};
    
        data.forEach(row => {
          const {
            varid,
            childid,
            codeid,
            code,
            date,
            note,
            consigned,
            reconsigned,
            hide,
            flag,
            sold,
            agentid,
            consignedDealerId,
            consignedDealerName,
            consignedDealerInitials,
            reconsignedDealerId,
            reconsignedDealerName,
            reconsignedDealerInitials,
          } = row;
    
          const dataToPush = {
            varid,
            childid,
            codeid,
            code,
            date,
            note,
            consigned,
            reconsigned,
            hide,
            flag,
            sold,
            agentid,
            consignedDealerId,
            consignedDealerName,
            consignedDealerInitials,
            reconsignedDealerId,
            reconsignedDealerName,
            reconsignedDealerInitials,
          };
    
          if (result[codeid]) {
            result[codeid].push(dataToPush);
          } else {
            result[codeid] = [dataToPush];
          }
        });
    
        res.status(200).json({
          success: true,
          data: result,
        });
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error',
        });
      }
    }

    

    catch (e) {
        res.status(500).json({ message: e.message })
        }
    }

