import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Table from './components/Table'
import { MainMenu } from './components/MainMenu'
import {types} from './components/Table'

export const Routes = () => {

    //creating structure of my tables
    //it is are arrays of objects, those pbjects represents columns
    //first value in object is name of the column, second - it is type
    const studentstable = [
        {field: 'id', type: types.number},
        {field: 'pip', type: types.string},
        {field: 'curs', type: types.number},
        {field: 'b_date', type: types.date},
        {field: 's_id', type: types.number},
        {field: 'f_id', type: types.number},
    ]

    const speciality = [
        {field: 'id', type: types.number},
        {field: 'fac_id', type: types.number},
        {field: 'name', type: types.string},
    ]

    const faculty = [
        {field: 'id', type: types.number},
        {field: 'name', type: types.string},
    ]

   

    return(
        //creating routes, it is set up component(s) for each possible api of the application 
        <Switch>
            <Route path="/" exact>
                <MainMenu />
            </Route>

            <Route path="/students" exact>
                <Table table={studentstable} tableName="students" randomize={true}/>
            </Route>

            <Route path="/speciality" exact>
                <Table table={speciality} tableName="speciality" randomize={true}/>
            </Route>

            <Route path="/faculty" exact>
                <Table table={faculty} tableName="faculty" randomize={true}/>
            </Route>

            <Redirect to="/" />
        </Switch>
    )}
