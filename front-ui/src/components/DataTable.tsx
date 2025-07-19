import { useEffect, useState } from "react"
import { Col, Form, Row, Table } from "react-bootstrap"

export const DataTable: React.FC<{data: any[], searchable?: any[]}> = ({data , searchable = []}) => {
    const [term, setTerm] = useState<string>('')
    const [filtered, setFiltered] = useState<any[]>([])

    useEffect(() => {
        if(term.length > 0) {
             let list = data.filter(item => {
                for(let k of searchable) {
                    if(item[k].toLowerCase().includes(term.toLowerCase())) {
                        return true
                    }
                }
                return false 
             })
             setFiltered(list)
        } else {
            setFiltered(data)
        }
    },[term, data])

    return <Row>
        <Col>
        {searchable.length > 0 && <Row>
            <Col md={4} className="ms-auto mb-3">
            <Form.Control placeholder="Search" onChange={({target}) => setTerm(target.value)}/>
            </Col>
        </Row>}
            <Row>
                <Col>
                    {filtered.length > 0 ?  
       <Table bordered striped hover size="sm">
          <thead className="table-dark">
            <tr>
                {Object.keys(data[0]).map((key, i) => <th key={i}>{key}</th>)}
            </tr>
           </thead>
           <tbody>
            {filtered.map(((item, i) => <tr key={i}>
                 {/* @ts-ignore */}
                {Object.values(item).map((value, j) => <td key={j}>{value}</td>)}
            </tr>))}
           </tbody>
        </Table> : 
                      <h4 className="text-muted">No data found</h4>}
                </Col>
            </Row>
        </Col>
    </Row>
}








 