import { immerable } from "immer";

import { IGameboardCore } from "./IGameboardCore"
import { IAdjList } from "../AdjList/IAdjList";
import { AdjList } from "../AdjList/AdjList";
import { VisualizerVertex } from "../Vertex/VisualizerVertex";

enum defAlgs {
    default
}

export abstract class AbsGameboard implements IGameboardCore {
    name: string = "default";
    gameboard: AdjList = new AdjList();
    currentAlg: string = defAlgs[0];
    algs: any = defAlgs;

    public size = {
        height: 20,
        width: 20
    };

    [immerable] = true;

    createGameboard: () => IAdjList = () => {
        this.gameboard = new AdjList();
        const { height, width } = this.size;
        const totalCells = height * width;
        for (let i = 1; i <= totalCells; i++) {
            const newVertex = new VisualizerVertex({
                blocked: false
            }, i)

            this.gameboard.addVertex(newVertex);
        }

        return this.gameboard;
    }

    protected constructor(name?: string, height?: number, width?: number, algs?: any) {
        if (height && width) {
            this.size.height = height;
            this.size.width = width;
        }

        this.createGameboard();
        console.log(this.gameboard);
        if (algs) {
            this.algs = algs;
        }

        if (name) {
            this.name = name;
        }

        return this;
    }
}