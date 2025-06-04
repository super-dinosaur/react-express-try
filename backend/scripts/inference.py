import argparse

def main(args):
    print(args.VideoPath)
    print(args.ModulePath)
    print(args.OutputDir)
    print("ok;pass")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--VideoPath",type=str,default="~/Downloads/demo.mp4")
    parser.add_argument("--ModulePath", type=str, default="~/Downloads/mymodel.pth")
    parser.add_argument("--OutputDir",type=str,default="~/Downloads/")

    args = parser.parse_args()
    main(args)

