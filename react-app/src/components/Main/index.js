import React from 'react'
import { Route, Switch } from "react-router-dom";
import Landing from './Landing';
import Frogs from './frogs';
import Bigfrogs from './bigfrogs';
import Smallfrogs from './Smallfrogs';
import Happyfrogs from './Happyfrogs';
import Angryfrogs from './Angryfrogs';
import Cart from './Cart';

export default function Main() {
  return (
    <Switch>
        <Route exact path='/'>
        <Landing/>
        </Route>
        <Route exact path='/frogs'>
        <Frogs/>
        </Route>
        <Route exact path='/frogs/big'>
        <Bigfrogs/>
        </Route>
        <Route exact path='/frogs/small'>
        <Smallfrogs/>
        </Route>
        <Route exact path='/frogs/happy'>
        <Happyfrogs/>
        </Route>
        <Route exact path='/frogs/angry'>
        <Angryfrogs/>
        </Route>
        <Route exact path='/cart'>
        <Cart/>
        </Route>
    </Switch>
  )
}
