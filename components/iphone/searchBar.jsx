import {Autocomplete} from "@mui/material";

export default function searchBar(data,placeHolder){
    return(


        <div className="search">
            <div className="searchInput" style='color:black;'>
                <Autocomplete
                
                    id="custom-input-demo"
                    options={data}
                    getOptionLabel={(opt)=> opt.sport}
                    renderInput={(params) =>(
                        <div ref={params.InputProps.ref}>
                            <input type="text" {...params.inputProps} placeHolder={placeHolder} autoFocus='true'/>

                        </div>
                    )}


                >



                </Autocomplete>
            </div>
        </div>  


    )


}