import {configureStore} from "@reduxjs/toolkit"
import { allhotelreducer, hoteldetailreducer, hotelroomdetailreducer, newhotelreducer, searchhotelreducer } from "./components/reducers/hotelreducer";
import { newroomreducer, reserveroomreducer } from "./components/reducers/roomreducer";
const store=configureStore({
    reducer:{
        searchhotelred:searchhotelreducer,
        newhotelred:newhotelreducer,
        newroomred:newroomreducer,
        allhotelred:allhotelreducer,
        hoteldetailred:hoteldetailreducer,
        reserveroomred:reserveroomreducer,
        hotelroomdetailred:hotelroomdetailreducer,

    }
});

export default store;