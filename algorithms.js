const configuration = {
    defaultSize: 0.25
}

function processLevel(footprint, height){
    const scaffoldings=[];
    for(let i = 0 ; i < footprint.length; i++){
        let start;
        let end;
        if(i < footprint.length-1){
            start = footprint[i];
            end = footprint[i+1];
        } else {
            start = footprint[footprint.length-1];
            end = footprint[0];
        }
        const scaffolding = {
            x:null,
            y:null,
            width:null,
            length:null,
            height:height-0.5
        }
        if(start.x == end.x) {
            scaffolding.x = start.x-configuration.defaultSize;
            scaffolding.width = configuration.defaultSize*2;
            scaffolding.y = Math.min(start.y, end.y);
            scaffolding.length = Math.abs(start.y - end.y);
        } else if(start.y == end.y){
            scaffolding.y = start.y-configuration.defaultSize;
            scaffolding.length = configuration.defaultSize*2;
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
            const xs=x1 -udy * configuration.defaultSize;
            const ys=y1 + udx * configuration.defaultSize;
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

function generateScaffolding(building) {
    const scaffoldings = [];
    for(const level of building.levels){
        scaffoldings.push(...processLevel(level.footprint, level.height))
    }

    return scaffoldings;
}

exports.generate_scaffolding = generate_scaffolding