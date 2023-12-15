import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap';


export default class Rejecttoast extends Component {

    render() {

        const toastCssR = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'
        };

        return (
            <div id='2'style={this.props.show ? toastCssR : null}>
                <Toast className={`border text-white ${this.props.type==="reject"?"border-success bg-success":"border-danger bg-danger"}`} show={this.props.show}>
                    <ToastHeader className={`text-white ${this.props.type==="reject"? "bg-success":"bg-danger"} `} closeButton={false}>
                        <strong className='mr-auto'>Success</strong>
                    </ToastHeader>


                    <ToastBody>
                        {this.props.message}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}