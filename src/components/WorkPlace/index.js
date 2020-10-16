import './index.less'
export default {
    data() {
        return {
            // width: 0,
            // height: 0,
            // x: 0,
            // y: 0,
            new_component: null
        }
    },
    components: {},
    props: {},
    watch: {},
    created() { },
    mounted() {
        this.$event.on("place_components", this.receiveComponent);
    },
    beforeDestroy() {
        this.$event.$off("place_components", this.receiveComponent);
    },
    methods: {
        receiveComponent(type) {
            console.log("receiveComponent")
            if (type == "input") {
                const input_component = (
                    <vue-draggable-resizable
                        w={300}
                        h={50}
                        on-dragging={this.onDrag}
                        on-resizing={this.onResize}
                        parent={true}
                        class="test-input"
                    >
                        <el-input placeholder="请输入内容"></el-input>
                    </vue-draggable-resizable>
                )
                this.new_component = input_component
            }
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
    },

    render() {
        const workPlace = (
            <vue-draggable-resizable
                w={300}
                h={50}
                on-dragging={this.onDrag}
                on-resizing={this.onResize}
                parent={true}
                class="test-input"
            >
                <el-input placeholder="请输入内容"></el-input>
            </vue-draggable-resizable>
        )

        return (
            <div class="work-place" >
                {/* {workPlace} */}
                {this.new_component}
            </div >
        )
    }
}
