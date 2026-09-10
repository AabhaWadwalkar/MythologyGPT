
// import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router'
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home/Home';
import { Chat } from './pages/Chat/Chat'
import { Compare } from './pages/Compare/Compare';
import { GodDetail } from './pages/GodDetail/GodDetail';
import { Graph } from './pages/Graph/Graph';
import {Story} from './pages/Story/Story';
import { Layout } from './components/Layout';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route element={<Layout/>}>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/' element={<Home/>} />
      <Route path='/compare' element={<Compare/>} />
      <Route path='/graph' element={<Graph/>} />
      <Route path='/god/:name' element={<GodDetail/>} />
      <Route path='/story' element={<Story/>}/>
    </Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
