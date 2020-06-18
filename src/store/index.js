import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const INITIAL_DATA = {
    prayers: [
        {
            id: "1546968934",
            category: "2229162",
            title: "New job",
            notes: "Praying to the Creator of all Heaven and Earth to bless me with an awesome job in software development",
            progress: 1,
            progressUpdate: "",
            createdAt: 1589422847000,
            updatedAt: 1589422847000
        },
        {
            id: "1546969212",
            category: "1430415",
            title: "Single parents in current times",
            notes: "Economy is down and there is worldwide tension.  I pray for faith, peace, fortitude, and financial stability for those raising kids by themself in these trying times",
            progress: 2,
            progressUpdate: "",
            createdAt: 1587013783000,
            updatedAt: 1587013783000
        },
        {
            id: "1546961009",
            category: "9220492",
            title: "Give thanks for health and well being",
            notes: "I am healthy during this pandemic, have more than enough food to eat, and have enough money to pay my bills. I pray that my Father in Heaven accept my thanks and gratitude for his mighty blessings!",
            progress: 2,
            progressUpdate: "",
            createdAt: 1589422847000,
            updatedAt: 1589422847000
        },
        {
            id: "1546960721",
            category: "2229162",
            title: "Praying for van to get repaired",
            notes: "Need a solid, reliable vehicle. Been having problems with overheating and antifreeze leaks",
            progress: 3,
            progressUpdate: "Car was repaired: new timing chain, timing cover gasket, water pump, thermostat, serpentine belt, radiator, rotors, and brake pads too!",
            createdAt: 1583243121000,
            updatedAt: 1589940756000
        },
        {
            id: "1546960079",
            category: "1430415",
            title: "Praying for Pete and his mother",
            notes: "The house they were living in caught on fire and is now uninhabitable.  His mother is disabled and on Social Security.",
            progress: 3,
            progressUpdate: "I spoke with Pete today (after not seeing him for months) and his mother is doing fine and has been moved into another residence.  She even got help moving in from some church brothers.  Pete found a place in Frederickson and has been slowly salvaging the stuff in the house.  He stated that there is still alot of stuff that didn't burn completely.",
            createdAt: 1583806907000,
            updatedAt: 1592274107000
        }
    ]
};

export const store = new Vuex.Store({
    state: {
        prayerItems: [],
        categories: {
            "1430415": { _id: "1430415", text: "For Others" },
            "2229162": { _id: "2229162", text: "Personal" },
            "9220492": { _id: "9220492", text: "Gratitude" }
        },
        progress: {
            1: { _id: 1, text: "in progress" },
            2: { _id: 2, text: "ongoing" },
            3: { _id: 3, text: "answered" }
        }
    },
    getters: {
        prayers: state => {
            return state.prayerItems;
        }
    },
    mutations: {
        SAVE_PRAYER_LIST: (state, payload) => {
            state.prayerItems = payload;
        },
        ADD_NEW_PRAYER: (state, payload) => {
            state.prayerItems.push(payload);
        },
        UPDATE_PRAYER_ITEM: (state, payload) => {
            let curPrayer = payload;

            //will return index of prayer in the array when condition is met
            const ix = state.prayerItems.findIndex((prayer) => {
                return prayer.id === curPrayer.id;
            });

            state.prayerItems[ix] = curPrayer;
        },
        REMOVE_PRAYER_ITEM: (state, payload) => {
            let curPrayer = payload;

            const ix = state.prayerItems.findIndex((prayer) => {
                return prayer.id === curPrayer.id;
            });

            state.prayerItems.splice(ix, 1);
        }
    },
    actions: {
        initStore(context){
            let initData = INITIAL_DATA.prayers;

            //check if there is user data already
            var prayersStore = localStorage.getItem('my_prayers');

            if(prayersStore){
                var tempData = JSON.parse(prayersStore);
                if(tempData.length > 0)
                initData = tempData;
            }

            context.commit('SAVE_PRAYER_LIST', initData);
            persistData(initData);
        },
        savePrayer(context, prayer) {
            prayer.id = Math.random().toString(36).substr(7);
            prayer = addTimeStampToPrayer(prayer, false);

            context.commit('ADD_NEW_PRAYER', prayer);
            persistData(context.state.prayerItems);
        },
        updatePrayer(context, curPrayer) {
            curPrayer = addTimeStampToPrayer(curPrayer, true);

            context.commit('UPDATE_PRAYER_ITEM', curPrayer);
            persistData(context.state.prayerItems);
        },
        deletePrayer(context, curPrayer) {
            context.commit('REMOVE_PRAYER_ITEM', curPrayer);
            persistData(context.state.prayerItems);
        },
        filterPrayers(context, progressFilter) {
            let listObj = context.state.prayerItems;
            const view = listObj.filter(prayer =>
                prayer.progress === progressFilter);

            return view;
        }
    }
});


//adding needed prayer data elements here
function addTimeStampToPrayer(dataIn, isUpdate){
    var currentTimeStamp = new Date().getTime();

    //only add created date to new prayers
    if(!isUpdate) {
        dataIn.createdAt = currentTimeStamp;
    }

    dataIn.updatedAt = currentTimeStamp;
    return dataIn;
}

function persistData(dataIn) {
    localStorage.setItem('my_prayers', JSON.stringify(dataIn));
}
