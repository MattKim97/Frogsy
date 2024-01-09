import React from 'react'
import { Route, Switch } from "react-router-dom";
import Landing from './Landing';
import Frogs from './frogs';
import Bigfrogs from './bigfrogs';
import Smallfrogs from './Smallfrogs';
import Happyfrogs from './Happyfrogs';
import Angryfrogs from './Angryfrogs';
import Cart from './Cart';
import MyFrogs from './MyFrogs';
import FrogForm from './FrogForm';
import Frog from './Frog';
import FrogUpdateForm from './FrogUpdateForm';
import FavoritedFrogs from './FavoritedFrogs';

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
        <Route exact path='/myfrogs'>
        <MyFrogs/>
        </Route>
        <Route exact path='/favorites'>
        <FavoritedFrogs/>
        </Route>
        <Route exact path='/frogs/new'>
        <FrogForm/>
        </Route>
        <Route exact path='/frogs/:frogId'>
        <Frog/>
        </Route>
        <Route exact path='/frogs/:frogId/edit'>
        <FrogUpdateForm/>
        </Route>

    </Switch>
  )
}
