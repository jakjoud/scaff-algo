const configuration = {
    default_size: 0.25
}

function process_level(foot_print, height){
    const scaffoldings=[];
    for(let i = 0 ; i < foot_print.length(); i++){
        let start;
        let end;
        if(i < foot_print.length()-1){
            start = foot_print[i];
            end = foot_print[i+1];
        } else {
            start = foot_print[foot_print.length()-1];
            end = foot_print[0];
        }
        const scaffolding = {
            x:null,
            y:null,
            width:null,
            length:null,
            height:height/2
        }
        if(start.x == end.x) {
            scaffolding.x = start.x-configuration.default_size;
            scaffolding.width = configuration.default_size*2;
            scaffolding.y = Math.min(start.y, end.y);
            scaffolding.length = Math.abs(start.y - end.y);
        } else if(start.y == end.y){
            scaffolding.y = start.y-configuration.default_size;
            scaffolding.length = configuration.default_size*2;
            scaffolding.x = Math.min(start.x, end.x);
            scaffolding.width = Math.abs(start.x - end.x);
        } else {
            const x1=start.x;
            const x2=end.x;
            const y1=start.y;
            const y2=end.y;
            const dx=x2-x1;
            const dy=y2-y1;
            const len = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
            const udx = dx / len;
            const udy = dy / len;
            const xs=x1 -udy * configuration.default_size;
            const ys=y1 + udx * configuration.default_size;
            const xe=xs + dx;
            const ye=ys + dy;
            scaffolding.x = Math.min(xs, xe);
            scaffolding.y = Math.min(ys, ye);
            scaffolding.width=Math.abs(dx);
            scaffolding.length=Math.abs(dy);
        }

        scaffoldings.push(scaffolding);
    }

    return scaffoldings;
}

function generate_scaffolding(building) {
    const scaffoldings = [];
    for(const level of building.levels){
        scaffoldings.push(...process_level(level.footprint, level.height))
    }

    return scaffoldings;
}
