export class WeightUtility
{
    public static calculateWeight(inPounds:number, unit:WeightUnits):number
    {
        if(unit == WeightUnits.Pounds)
        {
            return inPounds;
        }
        else if(unit == WeightUnits.Stone)
        {
            return inPounds / 14;
        }
        else if(unit == WeightUnits.KG)
        {
            return inPounds / 2.205
        }

        return 0;
    }

    public static weightToPounds(weight:number, unit:WeightUnits):number
    {
        if(unit == WeightUnits.Pounds)
        {
            return weight;
        }
        else if(unit == WeightUnits.Stone)
        {
            return weight * 14;
        }
        else if(unit == WeightUnits.KG)
        {
            return weight * 2.205
        }

        return 0;
    }

    public static getPluralWeightName(unit:WeightUnits | undefined):string
    {
        if(unit == undefined)
            return "pounds";
        if(unit == WeightUnits.Pounds)
        {
            return "pounds";
        }
        else if(unit == WeightUnits.Stone)
        {
            return "stone";
        }
        else if(unit == WeightUnits.KG)
        {
            return "kilograms"
        }

        return "pounds";
    }
}


export enum WeightUnits
{
    Pounds,
    Stone,
    KG
}