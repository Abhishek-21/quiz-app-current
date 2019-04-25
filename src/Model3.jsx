import React,{ Component } from 'react';

// this the modal that is used to view data from different categories

class Model3 extends Component {
    
    render() {
        return (
            <div id="view-value-container-background" style={{display: "none"}}>
                <div id="view-value-container">
                <div className="model-header2"><span className="close-box2">X</span></div>
                    <div id="changelook">
                        <table id="modalTable2">
                            <tbody>
                                {/* dynamically viewing form content  */}
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>
        );
    }   
}

export default Model3