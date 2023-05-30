import MySQL from "../../_common/MySQL/MySQL";

//TODO: only return data if the user is logged in

async function getConsignees() {
    const query = `select dealerid, dealer, initials from dealers`;

    const mysql = new MySQL();
    return mysql.query(query);

}

export default async function handler(req, res) {
    const consignees = await getConsignees();
    const data = {
        success: true,
        consignees: consignees,
    }
    res.status(200).json(data);

}