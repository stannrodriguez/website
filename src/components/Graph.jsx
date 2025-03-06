import { useState, useCallback, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import "./Graph.css";
// or ForceGraph3D for 3D visualization

const Graph = () => {
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Add state history tracking
  const [history, setHistory] = useState([{ selectedNode: null, expandedNodes: new Set() }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isNavigating = useRef(false);

  // Navigation state
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  // Add state for simulation time
  const [simulationTime, setSimulationTime] = useState(0);

  // Update history when state changes (debounced)
  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;
      return;
    }

    const newState = {
      selectedNode,
      expandedNodes: new Set(Array.from(expandedNodes)), // Create deep copy of Set
    };

    // Only add to history if state actually changed
    const lastState = history[currentIndex];
    const hasSelectedNodeChanged = lastState.selectedNode?.id !== newState.selectedNode?.id;
    const hasExpandedNodesChanged =
      lastState.expandedNodes.size !== newState.expandedNodes.size ||
      Array.from(lastState.expandedNodes).some((id) => !newState.expandedNodes.has(id));

    if (hasSelectedNodeChanged || hasExpandedNodesChanged) {
      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        return [...newHistory, newState];
      });
      setCurrentIndex((prev) => prev + 1);
    }
  }, [selectedNode, expandedNodes, currentIndex, history]);

  // Navigation functions with improved state restoration
  const handleUndo = useCallback(() => {
    if (!canUndo) return;

    isNavigating.current = true;
    const previousState = history[currentIndex - 1];
    setSelectedNode(previousState.selectedNode);
    setExpandedNodes(new Set(Array.from(previousState.expandedNodes)));
    setCurrentIndex((prev) => prev - 1);
  }, [canUndo, history, currentIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;

    isNavigating.current = true;
    const nextState = history[currentIndex + 1];
    setSelectedNode(nextState.selectedNode);
    setExpandedNodes(new Set(Array.from(nextState.expandedNodes)));
    setCurrentIndex((prev) => prev + 1);
  }, [canRedo, history, currentIndex]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add animation frame effect
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setSimulationTime((prev) => prev + 1);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Constants for node positioning
  const RADIUS = 80;
  const START_ANGLE = -Math.PI / 2;
  const ANGLE_STEP = (2 * Math.PI) / 4;

  const allNodesAndLinks = {
    nodes: [
      {
        id: "stephanie",
        label: ["Stephanie", "Rodriguez"],
        group: "center",
        size: dimensions.width < 768 ? 15 : 20,
        level: 0,
        description: "Building technology that elevates the human spirit.",
        fx: 0,
        fy: 0,
      },
      // Level 1 nodes (always visible)
      {
        id: "vision",
        label: ["Vision"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description:
          "Technology should enrich the best parts of us—our creativity, connection, and fulfillment. I strive for a future where people feel more alive and connected than ever.\n\nAI and LLMs are creating a new abstraction layer for work—one that can expand what's possible for humanity. I want to help shape this transformation.",
        level: 1,
        fx: Math.cos(START_ANGLE) * RADIUS,
        fy: Math.sin(START_ANGLE) * RADIUS,
      },
      {
        id: "about",
        label: ["About", "Me"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description:
          "I've always been drawn to how technology shapes us and how we shape technology. My work explores this relationship across disciplines—technical, psychological, moral, and aesthetic.\n\nI believe designing a better future requires understanding all these dimensions.",
        level: 1,
        fx: Math.cos(START_ANGLE + ANGLE_STEP) * RADIUS,
        fy: Math.sin(START_ANGLE + ANGLE_STEP) * RADIUS,
      },
      {
        id: "projects",
        label: ["Projects"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description:
          "All of my work deals with our relationship to technology—how we shape it and how it shapes us. Each project explores different aspects of human-technology interaction.",
        level: 1,
        fx: Math.cos(START_ANGLE + 2 * ANGLE_STEP) * RADIUS,
        fy: Math.sin(START_ANGLE + 2 * ANGLE_STEP) * RADIUS,
      },
      {
        id: "career",
        label: ["Career", "Journey"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description:
          "My journey from finance to software engineering is a story of evolution and learning. Each role has shaped my understanding of how technology can serve human flourishing.",
        level: 1,
        fx: Math.cos(START_ANGLE + 3 * ANGLE_STEP) * RADIUS,
        fy: Math.sin(START_ANGLE + 3 * ANGLE_STEP) * RADIUS,
      },
      // Level 2 nodes
      // Vision children
      {
        id: "philosophy",
        label: ["Philosophy"],
        group: "vision",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "I believe technology must do two things to be good:\n\n1. It must serve a good purpose.\n2. It must make a person better by virtue of having used it.\n\nTechnology shouldn't treat humanness as a limitation to overcome. Instead, it should enrich the best parts of us.",
        level: 2,
        parent: "vision",
      },
      {
        id: "future",
        label: ["Future Focus"],
        group: "vision",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "Right now, I'm particularly excited about:\n\n• AI-powered tools that augment human capabilities\n• The future of work & intelligence interfaces\n\nI want to help shape a future where technology enriches humanness, not erodes it.",
        level: 2,
        parent: "vision",
      },
      // About children
      {
        id: "background",
        label: ["Background"],
        group: "about",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "Born in the Philippines, I immigrated to the U.S. at age 8. From a young age, I worked multiple jobs, commuted 12 hours a week, and balanced a double major while volunteering.\n\nI was the first in my family to graduate from college, despite being the second youngest of four. I studied Financial Math & Statistics, started in finance, and then pivoted into software engineering.",
        level: 2,
        parent: "about",
      },
      {
        id: "philosophy-work",
        label: ["Work Philosophy"],
        group: "about",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "I don't take work for granted. Having grown up seeing how limited opportunity can be, I view work through a lens of gratitude—as a way to apply my full potential and help others flourish.\n\nMy goal isn't just to build things. It's to build things that help people feel more alive, connected, creative, and fulfilled than ever.",
        level: 2,
        parent: "about",
      },
      // Projects children
      {
        id: "neopom",
        label: ["Neopom"],
        group: "projects",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "A productivity app with 200,000+ users, built in 4 days a year after I learned to code.\n\nA user once told me it helped her get through college. That remains my proudest accomplishment.",
        level: 2,
        parent: "projects",
      },
      {
        id: "browser",
        label: ["Web Browser"],
        group: "projects",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "Built a working web browser from scratch to deeply understand how the internet works.\n\nExplored rendering engines, networking, and systems programming to understand the fundamentals of web technology.",
        level: 2,
        parent: "projects",
      },
      // Career children
      {
        id: "finance",
        label: ["Finance"],
        group: "career",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "Started in finance with roles at Kaiser Permanente as an actuary and Capital Group ($2.7T AUM) as a quantitative analyst.\n\nThis experience taught me the importance of rigorous analysis, but I realized I wanted to build things, not just analyze them.",
        level: 2,
        parent: "career",
      },
      {
        id: "amazon",
        label: ["Amazon"],
        group: "career",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "At Prime Gaming, I led the website redesign and prototyped the initial service for the personalization team.\n\nThis role taught me how to build and scale systems that impact millions of users.",
        level: 2,
        parent: "career",
      },
      {
        id: "notion",
        label: ["Notion"],
        group: "career",
        size: dimensions.width < 768 ? 10 : 10,
        description:
          "Spent 2.5 years working on infrastructure and growth at Notion, helping shape how millions of people work and create.\n\nFocused on building tools that enhance human creativity and collaboration.",
        level: 2,
        parent: "career",
      },
    ],
    links: [
      // Level 1 links
      { source: "stephanie", target: "vision", value: 3 },
      { source: "stephanie", target: "career", value: 3 },
      { source: "stephanie", target: "projects", value: 3 },
      { source: "stephanie", target: "about", value: 3 },
      // Level 2 links
      { source: "vision", target: "philosophy", value: 2, level: 2 },
      { source: "vision", target: "future", value: 2, level: 2 },
      { source: "about", target: "background", value: 2, level: 2 },
      { source: "about", target: "philosophy-work", value: 2, level: 2 },
      { source: "projects", target: "neopom", value: 2, level: 2 },
      { source: "projects", target: "browser", value: 2, level: 2 },
      { source: "career", target: "finance", value: 2, level: 2 },
      { source: "career", target: "amazon", value: 2, level: 2 },
      { source: "career", target: "notion", value: 2, level: 2 },
    ],
  };

  // Calculate positions for child nodes when parent is expanded
  const getChildNodePositions = (parentNode, childCount) => {
    const childRadius = 60;
    const startAngle = -Math.PI / 3;
    const angleStep = (2 * Math.PI) / 3 / (childCount - 1);

    return Array.from({ length: childCount }).map((_, index) => {
      const angle = startAngle + angleStep * index;
      // Add subtle movement to child positions
      const time = simulationTime * 0.001; // Slow down the movement
      const wobble = Math.sin(time + index) * 2; // Small wobble effect
      return {
        x: parentNode.fx + Math.cos(angle) * (childRadius + wobble),
        y: parentNode.fy + Math.sin(angle) * (childRadius + wobble),
      };
    });
  };

  // Filter nodes and links based on expanded state and selected node
  const graphData = {
    nodes: allNodesAndLinks.nodes.filter((node) => {
      if (!selectedNode) {
        return node.level <= 1;
      } else {
        const shouldShow =
          node.level === 0 || // Always show center node
          node.id === selectedNode.id || // Show selected node
          (expandedNodes.has(node.parent) && node.parent === selectedNode.id); // Show children if parent is expanded

        // Position child nodes when parent is expanded
        if (shouldShow && node.level === 2) {
          const parent = allNodesAndLinks.nodes.find((n) => n.id === node.parent);
          if (parent && expandedNodes.has(parent.id)) {
            const siblings = allNodesAndLinks.nodes.filter((n) => n.parent === parent.id);
            const childPositions = getChildNodePositions(parent, siblings.length);
            const childIndex = siblings.findIndex((n) => n.id === node.id);
            node.fx = childPositions[childIndex].x;
            node.fy = childPositions[childIndex].y;
          }
        }

        return shouldShow;
      }
    }),
    links: allNodesAndLinks.links.filter((link) => {
      if (!selectedNode) {
        return !link.level;
      } else {
        const sourceId = typeof link.source === "object" ? link.source.id : link.source;
        const targetId = typeof link.target === "object" ? link.target.id : link.target;

        const isSelectedNodeLink =
          (sourceId === "stephanie" && targetId === selectedNode.id) ||
          (sourceId === selectedNode.id && targetId === "stephanie");

        const isChildLink = expandedNodes.has(selectedNode.id) && sourceId === selectedNode.id;

        return isSelectedNodeLink || isChildLink;
      }
    }),
  };

  // Add useEffect for centering animation with cleanup
  useEffect(() => {
    let fg = document.querySelector(".force-graph-container");
    if (!fg) return;

    const handleTransitionEnd = () => {
      if (!selectedNode) {
        fg.style.transform = "none";
      }
    };

    fg.addEventListener("transitionend", handleTransitionEnd);

    if (selectedNode) {
      const centerX = selectedNode.fx || selectedNode.x || 0;
      const centerY = selectedNode.fy || selectedNode.y || 0;
      const k = dimensions.width < 768 ? 1.2 : 1.5;

      fg.style.transition = "transform 0.5s ease-in-out";
      fg.style.transform = `translate(${-centerX * k}px, ${-centerY * k}px) scale(${k})`;
    } else {
      fg.style.transition = "transform 0.5s ease-in-out";
      fg.style.transform = "none";
    }

    return () => {
      if (fg) {
        fg.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [selectedNode, dimensions.width]);

  const handleNodeHover = useCallback(
    (node) => {
      setHoveredNode(node);
      if (!node) {
        setHighlightLinks(new Set());
        return;
      }

      // Highlight all links connected to this node
      const connectedLinks = graphData.links
        .filter((link) => {
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const targetId = typeof link.target === "object" ? link.target.id : link.target;
          return sourceId === node.id || targetId === node.id;
        })
        .map((link) => {
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const targetId = typeof link.target === "object" ? link.target.id : link.target;
          return sourceId + "-" + targetId;
        });

      setHighlightLinks(new Set(connectedLinks));
    },
    [graphData.links]
  );

  const handleNodeClick = useCallback(
    (node) => {
      if (node.level === 0) {
        // Reset view when clicking center node
        setSelectedNode(null);
        setExpandedNodes(new Set());
        return;
      }

      // If clicking a primary node (level 1)
      if (node.level === 1) {
        if (selectedNode && node.id === selectedNode.id) {
          // If it's already selected, toggle expansion
          setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (prev.has(node.id)) {
              newSet.delete(node.id);
            } else {
              newSet.add(node.id);
            }
            return newSet;
          });
        } else {
          // If selecting a new primary node
          setSelectedNode(node);
          setExpandedNodes(new Set([node.id]));
        }
      } else if (node.level === 2) {
        // If clicking a child node, select its parent
        const parentNode = allNodesAndLinks.nodes.find((n) => n.id === node.parent);
        if (parentNode) {
          setSelectedNode(parentNode);
          setExpandedNodes(new Set([parentNode.id]));
        }
      }

      // Zoom animation
      const distance = dimensions.width < 768 ? 20 : 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y);
      return node.x || node.y ? { x: node.x * distRatio, y: node.y * distRatio } : { x: 0, y: 0 };
    },
    [dimensions.width, selectedNode, allNodesAndLinks.nodes]
  );

  return (
    <div
      className="graph-container"
      style={{
        display: "flex",
        flexDirection: dimensions.width < 768 ? "column" : "row",
        alignItems: "flex-start",
        width: "100%",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        className="info-panel"
        style={{
          position: dimensions.width < 768 ? "relative" : "fixed",
          top: dimensions.width < 768 ? "20px" : "200px",
          left: dimensions.width < 768 ? "auto" : "20px",
          margin: dimensions.width < 768 ? "0 20px 20px" : "0",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          width: dimensions.width < 768 ? "auto" : "450px",
          maxWidth: "calc(100% - 40px)",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
          maxHeight: dimensions.width < 768 ? "none" : "70vh",
          overflowY: dimensions.width < 768 ? "visible" : "auto",
        }}
      >
        <div
          className="graph-controls"
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            style={{
              padding: "10px 0",
              width: "100%",
              opacity: canUndo ? 1 : 0.2,
              cursor: canUndo ? "pointer" : "not-allowed",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              background: "white",
              fontSize: "16px",
              transition: "all 0.2s ease",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: canUndo ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
              transform: canUndo ? "scale(1)" : "scale(0.98)",
            }}
          >
            ←
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            style={{
              padding: "10px 0",
              width: "100%",
              opacity: canRedo ? 1 : 0.2,
              cursor: canRedo ? "pointer" : "not-allowed",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              background: "white",
              fontSize: "16px",
              transition: "all 0.2s ease",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: canRedo ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
              transform: canRedo ? "scale(1)" : "scale(0.98)",
            }}
          >
            →
          </button>
        </div>
        {selectedNode ? (
          <div
            className={`node-info ${dimensions.width < 768 ? "mobile" : ""}`}
            style={{
              width: "100%",
              opacity: 0.95,
              transition: "opacity 0.3s ease",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#222",
                fontSize: "18px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
            >
              {Array.isArray(selectedNode.label) ? selectedNode.label.join(" ") : selectedNode.label}
            </h3>
            <div
              style={{
                margin: "0 0 16px 0",
                color: "#444",
                lineHeight: "1.6",
                fontSize: "15px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {selectedNode.description.split("\n").map((paragraph, index) => (
                <p key={index} style={{ marginBottom: "12px" }}>
                  {paragraph}
                </p>
              ))}
            </div>
            {selectedNode.level < 2 && !expandedNodes.has(selectedNode.id) && (
              <p
                className="click-hint"
                style={{
                  margin: "16px 0 0 0",
                  color: "#666",
                  fontSize: "13px",
                  textAlign: "left",
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  opacity: 0.8,
                  fontStyle: "italic",
                }}
              >
                Click to explore more
              </p>
            )}
          </div>
        ) : (
          <div
            className="initial-sections"
            style={{
              width: "100%",
              opacity: 0.95,
              transition: "opacity 0.3s ease",
            }}
          >
            <h2
              style={{
                margin: "0 0 8px 0",
                color: "#222",
                fontSize: "24px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
            >
              Stephanie Rodriguez
            </h2>
            <div
              style={{
                margin: "0 0 24px 0",
                color: "#444",
                lineHeight: "1.6",
                fontSize: "15px",
              }}
            >
              <p style={{ marginBottom: "16px" }}>
                We're in an era of rapid technological change, where intelligence is now on tap. This shift can expand
                human potential in ways never before possible—augmenting our powers, accelerating our goals, and
                transforming our environments.
              </p>
              <p>
                While I'm fascinated by technology, what ultimately matters to me is the conservation and elevation of
                the human spirit.
              </p>
            </div>
            <h3
              style={{
                margin: "0 0 16px 0",
                color: "#222",
                fontSize: "16px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Explore
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {allNodesAndLinks.nodes
                .filter((node) => node.level === 1)
                .map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      setSelectedNode(node);
                      setExpandedNodes(new Set([node.id]));
                    }}
                    style={{
                      padding: "16px",
                      width: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "12px",
                      background: "white",
                      fontSize: "16px",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#333",
                      transition: "all 0.2s ease",
                      fontFamily: "Inter, system-ui, sans-serif",
                      letterSpacing: "-0.01em",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      ":hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        borderColor: "rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "16px" }}>
                      {Array.isArray(node.label) ? node.label.join(" ") : node.label}
                    </span>
                    <span style={{ fontSize: "18px", opacity: 0.3 }}>→</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
      <div
        className="graph-wrapper"
        style={{
          flex: 1,
          marginLeft: dimensions.width < 768 ? 0 : "500px",
          marginTop: dimensions.width < 768 ? 0 : "-200px",
          width: dimensions.width < 768 ? "100%" : "calc(100vw - 500px)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          transition: "all 0.3s ease",
        }}
      >
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width < 768 ? dimensions.width : dimensions.width - 500}
          height={
            dimensions.width < 768 ? Math.min(dimensions.height * 0.6, 800) : Math.min(dimensions.height * 0.9, 1200)
          }
          nodeRelSize={dimensions.width < 768 ? 4 : 6}
          nodeVal={(node) => {
            const baseSize = node.size * (hoveredNode?.id === node.id ? 1.4 : 1);
            // Add subtle pulse animation for selected node
            if (selectedNode?.id === node.id) {
              return baseSize * (1 + Math.sin(simulationTime * 0.004) * 0.1);
            }
            return baseSize;
          }}
          nodeLabel={(node) => node.description || node.label}
          linkWidth={(link) => {
            const isHighlighted = highlightLinks.has(link.source.id + "-" + link.target.id);
            if (isHighlighted) {
              return 2 * (1 + Math.sin(simulationTime * 0.005) * 0.2);
            }
            return 1;
          }}
          linkDirectionalParticles={(link) => (highlightLinks.has(link.source.id + "-" + link.target.id) ? 4 : 0)}
          linkDirectionalParticleSpeed={0.005}
          linkColor={(link) => {
            const isHighlighted = highlightLinks.has(link.source.id + "-" + link.target.id);
            return isHighlighted ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)";
          }}
          d3Force={(d3) => {
            d3.force("charge").strength(-200);
            d3.force("collision", d3.forceCollide(40));
            d3.force("link").distance(80);
            d3.force("center", null);
          }}
          onNodeHover={handleNodeHover}
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx) => {
            const isHovered = hoveredNode?.id === node.id;
            const fontSize =
              dimensions.width < 768 ? (node.group === "center" ? 6 : 5) : node.group === "center" ? 7 : 5.5;

            // Draw text
            ctx.font = `${node.group === "center" ? "500" : "400"} ${fontSize}px Inter`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = isHovered ? "#000" : "#333";

            // Handle multi-line text
            const lineHeight = fontSize * 1.4;
            const lines = Array.isArray(node.label) ? node.label : [node.label];
            const totalHeight = lines.length * lineHeight;

            lines.forEach((line, i) => {
              const y = node.y - totalHeight / 2 + i * lineHeight + lineHeight / 2;
              ctx.fillText(line, node.x, y);
            });
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
