import './index.less'
import {
    getElementAxis,
    getElementWidthAndHeight,
    judgePointInScale,
  } from "@/utils/scale";
export default {
    data() {
        return {
            // width: 0,
            // height: 0,
            // x: 0,
            // y: 0,
            new_component: null,
            materialComponents_moveIn_workPlace:false,
            components_array:[],
            componentsElement:[],
            workPlaceAxis:[]
        }
    },
    components: {},
    props: {},
    watch: {},
    created() { },
    mounted() {
        this.workPlaceAxis = getElementAxis(document.querySelector('.work-place'))
        this.$event.on("place_components", this.receiveComponent);
        this.$event.on("materialComponents_moveIn_workPlace", this.componentsInWorkPlace);
    },
    beforeDestroy() {
        this.$event.$off("place_components", this.receiveComponent);
        this.$event.$off("materialComponents_moveIn_workPlace", this.componentsInWorkPlace);
    },
    methods: {
        receiveComponent(info) {
            console.log(info)  
            this.materialComponents_moveIn_workPlace = false
            this.components_array.push(info)
            this.createElements(this.components_array)
        },
        componentsInWorkPlace(state){
            this.materialComponents_moveIn_workPlace = state;   
             
        },
        onResize: function (x, y, width, height) {
            // this.x = x;
            // this.y = y;
            // this.width = width;
            // this.height = height;
        },
        onDrag: function (x, y) {
            // this.x = x;
            // this.y = y;
            //  console.log(7777)
        },
        createElements(components_array){
            // console.log("components_array:",components_array)
            let element = []
            components_array.forEach((componentElement,index)=>{
                if(componentElement.type=='input'){
                    const input_component = (
                        <vue-draggable-resizable
                            class="test-input"
                            w={componentElement.width}
                            h={componentElement.height}
                            on-dragging={this.onDrag}
                            on-resizing={this.onResize}
                            parent={true}                         
                            x={componentElement.axis[0].x - this.workPlaceAxis[0].x}
                            y={componentElement.axis[0].y - this.workPlaceAxis[0].y}                 >
                            <el-input placeholder="请输入内容"></el-input>
                        </vue-draggable-resizable>
                    )
                    element.push(input_component)
                }
            })
            this.componentsElement = [...element]
        }
    },

    render() {
        return (
            <div class={'work-place',this.materialComponents_moveIn_workPlace&&'activeBackground'} >
                {this.componentsElement}
            </div >
        )
    }
}
