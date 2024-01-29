import { useLocation } from "react-router-dom"

export default function Test ( ){ 
  const state = useLocation().state
  console.log('state', state)
  console.log('history',history.state)


  return <div>test</div>
}