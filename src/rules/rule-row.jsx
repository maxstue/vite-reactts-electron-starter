import React from "react"
import { useGlobal } from "reactn"
import { DeleteIcon } from "@chakra-ui/icons"
// import { SocketContext } from "../../context/socket"

const RuleRow = function (props) {

    const { rule } = props
    const [ rules, setRules ] = useGlobal("rules")

    const denomo = rule.denomo.startsWith("CUSTOM") ? `Level - ${rule.denomoState}` : rule.denomo

    const handleDelete = function () {
        // socket.emit("delete-rule", rule)
        // const newRules = rules.filter(item => item.id !== rule.id)
        // setRules(newRules)
    }

    return (
        <>
            <div className="flex flex-row justify-between p-3 border-b hover:bg-purple-200">
                <div>{rule.numero} {rule.action} {denomo} ({rule.intent} - {rule.bias == "reduce" ? (rule.size * 100) + "%" : rule.size})</div>
                <div><span>{new Date(rule.updated || rule.created).toLocaleTimeString()}</span><span className="text-xs cursor-pointer hover:text-red-500 ml-2" onClick={handleDelete}><DeleteIcon /></span></div>
            </div>
        </>
    )
}

export default RuleRow